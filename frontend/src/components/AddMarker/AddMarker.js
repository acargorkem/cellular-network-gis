import { useState, useContext, useEffect } from 'react';
import { ScreenSpaceEventHandler, ScreenSpaceEvent } from 'resium';
import { ScreenSpaceEventType } from 'cesium';
import CesiumTooltip from '../CesiumTooltip';
import {
  getCartesian3FromScreen,
  getCartopgraphicFromCartesian3,
} from '../../services/coords';
import Confirmation from './Confirmation';
import { CesiumContext } from 'resium';

function AddMarker(props) {
  const [tooltipPosition, setTooltipPosition] = useState(null);
  const [confirmationPositions, setConfirmationPositions] = useState([]);
  const [confirmationIsActive, setConfirmationIsActive] = useState(false);
  const cesiumContext = useContext(CesiumContext);

  useEffect(() => {
    cesiumContext.scene.requestRender();
  }, [
    cesiumContext,
    tooltipPosition,
    confirmationPositions,
    confirmationIsActive,
  ]);

  useEffect(() => {
    cesiumContext.scene.canvas.style.cursor = 'crosshair';
    return () => {
      cesiumContext.scene.canvas.style.cursor = '';
    };
  }, [cesiumContext.scene.canvas.style]);

  const addMarkerAction = ({ position }) => {
    const cartesian3 = getCartesian3FromScreen(cesiumContext.scene, position);
    if (!cartesian3) {
      return;
    }
    const cartographic = getCartopgraphicFromCartesian3(
      cesiumContext.scene,
      cartesian3
    );
    setConfirmationPositions(cartographic);
    setConfirmationIsActive(true);
  };

  const showTooltipAction = (movement) => {
    let position = movement.endPosition;
    const cartesian3 = getCartesian3FromScreen(cesiumContext.scene, position);
    if (!cartesian3) {
      return;
    }
    setTooltipPosition(cartesian3);
  };

  const onConfirm = (name, distance) => {
    props.addMarker({ coords: confirmationPositions, name, distance });
    setConfirmationIsActive(false);
    props.close();
  };

  const onCancel = () => {
    setConfirmationIsActive(false);
    props.close();
  };

  return (
    <>
      {confirmationIsActive ? (
        <Confirmation
          latitude={confirmationPositions.latitude}
          longitude={confirmationPositions.longitude}
          height={confirmationPositions.height}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      ) : (
        <ScreenSpaceEventHandler>
          <ScreenSpaceEvent
            action={addMarkerAction}
            type={ScreenSpaceEventType.LEFT_CLICK}
          ></ScreenSpaceEvent>
          <ScreenSpaceEvent
            action={showTooltipAction}
            type={ScreenSpaceEventType.MOUSE_MOVE}
          ></ScreenSpaceEvent>
          <CesiumTooltip text="Select a location" position={tooltipPosition} />
        </ScreenSpaceEventHandler>
      )}
    </>
  );
}

export default AddMarker;
