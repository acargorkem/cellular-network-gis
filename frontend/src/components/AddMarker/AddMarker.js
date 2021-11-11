import { useState, useContext, useEffect } from 'react';
import './AddMarker.css';
import { RiMapPinAddLine } from 'react-icons/ri';
import { ScreenSpaceEventHandler, ScreenSpaceEvent } from 'resium';
import { ScreenSpaceEventType } from 'cesium';
import CesiumTooltip from '../CesiumTooltip';
import {
  getCartesian3FromScreen,
  getCartopgraphicFromCartesian3,
} from '../../services/coords';
import Confirmation from './Confirmation';
import { useDispatch } from 'react-redux';
import { addMarker } from '../../store/markerSlice';
import { CesiumContext } from 'resium';

function AddMarker() {
  const [isActive, setIsActive] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(null);
  const [confirmationPositions, setConfirmationPositions] = useState([]);
  const [confirmationIsActive, setConfirmationIsActive] = useState(false);
  const dispatch = useDispatch();
  const cesiumContext = useContext(CesiumContext);

  useEffect(() => {
    cesiumContext.scene.requestRender();
  }, [
    cesiumContext,
    tooltipPosition,
    confirmationPositions,
    confirmationIsActive,
  ]);

  const toggleIsActive = () => {
    setIsActive(!isActive);
    setConfirmationIsActive(false);
  };

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
    setIsActive(false);
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

  const toggleStyle = () => {
    if (isActive) {
      cesiumContext.viewer.canvas.style.cursor = 'crosshair';
      return 'active';
    } else {
      cesiumContext.viewer.canvas.style.cursor = '';
      return '';
    }
  };

  const onConfirm = (name, distance) => {
    dispatch(addMarker({ coords: confirmationPositions, name, distance }));
    setConfirmationIsActive(false);
  };

  const onCancel = () => {
    setConfirmationIsActive(false);
  };

  return (
    <>
      <div className={`add-marker-wrapper ${toggleStyle()}`}>
        <RiMapPinAddLine
          className="add-marker-icon"
          onClick={toggleIsActive}
          size="1.6em"
        />
      </div>

      {isActive && (
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
      {confirmationIsActive && (
        <Confirmation
          latitude={confirmationPositions.latitude}
          longitude={confirmationPositions.longitude}
          height={confirmationPositions.height}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      )}
    </>
  );
}
export default AddMarker;
