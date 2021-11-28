import { useState, useContext, useEffect } from 'react';
import Confirmation from './Confirmation';
import { CesiumContext } from 'resium';
import SelectCoordsFromMap from '../SelectCoordsFromMap';

function AddMarker(props) {
  const [confirmationPositions, setConfirmationPositions] = useState([]);
  const [confirmationIsActive, setConfirmationIsActive] = useState(false);
  const cesiumContext = useContext(CesiumContext);

  useEffect(() => {
    cesiumContext.scene.requestRender();
  }, [cesiumContext, confirmationPositions, confirmationIsActive]);

  const addMarkerAction = (cartographic) => {
    setConfirmationPositions(cartographic);
    setConfirmationIsActive(true);
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
        <SelectCoordsFromMap onClickHandle={addMarkerAction} />
      )}
    </>
  );
}

export default AddMarker;
