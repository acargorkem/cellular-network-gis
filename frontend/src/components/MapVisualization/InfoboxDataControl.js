import { useState } from 'react';
import { GiMove } from 'react-icons/gi';
import { AiFillDelete } from 'react-icons/ai';
import './InfoboxDataControl.css';
import SelectCoordsFromMap from '../SelectCoordsFromMap';

function InfoboxDataControl(props) {
  const [isChangeLocationActive, setIsChangeLocationActive] = useState(false);

  const toggleChangeLocation = () => {
    setIsChangeLocationActive(!isChangeLocationActive);
  };

  const getLocationStyle = () => {
    return isChangeLocationActive ? 'active' : '';
  };

  const onDeleteHandle = () => {
    if (window.confirm('Are you sure you wish to delete this marker?')) {
      props.closeInfobox();
      props.deleteMarker(props.arrayIndex);
    }
  };

  const onUpdateHandle = (cartographic) => {
    props.updateMarkerPosition(cartographic, props.arrayIndex);
  };

  return (
    <div className="infobox-data-control">
      <button
        className={`button-change-location ${getLocationStyle()}`}
        onClick={toggleChangeLocation}
      >
        {isChangeLocationActive ? (
          <>
            {'Select a new location on map'}
            <SelectCoordsFromMap onClickHandle={onUpdateHandle} />
          </>
        ) : (
          <>
            {'Update Location'}
            <GiMove className="infobox-data-control__icon" />
          </>
        )}
      </button>
      <button className="button-delete" onClick={onDeleteHandle}>
        Delete Marker !
        <AiFillDelete className="infobox-data-control__icon" />
      </button>
    </div>
  );
}

export default InfoboxDataControl;
