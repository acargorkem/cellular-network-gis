import { useState, useContext, useEffect } from 'react';
import { ScreenSpaceEventHandler, ScreenSpaceEvent } from 'resium';
import { ScreenSpaceEventType } from 'cesium';
import CesiumTooltip from './CesiumTooltip';
import { CesiumContext } from 'resium';
import {
  getCartesian3FromScreen,
  getCartopgraphicFromCartesian3,
} from '../services/coords';

function SelectCoordsFromMap(props) {
  const [tooltipPosition, setTooltipPosition] = useState(null);
  const cesiumContext = useContext(CesiumContext);

  useEffect(() => {
    cesiumContext.scene.requestRender();
  }, [cesiumContext, tooltipPosition]);

  useEffect(() => {
    cesiumContext.scene.canvas.style.cursor = 'crosshair';
    return () => {
      cesiumContext.scene.canvas.style.cursor = '';
    };
  }, [cesiumContext.scene.canvas.style]);

  const showTooltipAction = (movement) => {
    let position = movement.endPosition;
    const cartesian3 = getCartesian3FromScreen(cesiumContext.scene, position);
    if (!cartesian3) {
      return;
    }
    setTooltipPosition(cartesian3);
  };

  const onClickAction = ({ position }) => {
    const cartesian3 = getCartesian3FromScreen(cesiumContext.scene, position);
    if (!cartesian3) {
      return;
    }
    const cartographic = getCartopgraphicFromCartesian3(
      cesiumContext.scene,
      cartesian3
    );
    if (!cartographic) {
      return;
    }
    props.onClickHandle(cartographic);
  };

  return (
    <ScreenSpaceEventHandler>
      <ScreenSpaceEvent
        action={onClickAction}
        type={ScreenSpaceEventType.LEFT_CLICK}
      ></ScreenSpaceEvent>
      <ScreenSpaceEvent
        action={showTooltipAction}
        type={ScreenSpaceEventType.MOUSE_MOVE}
      ></ScreenSpaceEvent>
      <CesiumTooltip text="Select a location" position={tooltipPosition} />
    </ScreenSpaceEventHandler>
  );
}

export default SelectCoordsFromMap;
