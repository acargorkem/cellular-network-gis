import { useState } from 'react';
import { GiMove, GiCancel } from 'react-icons/gi';
import { AiFillDelete } from 'react-icons/ai';
import './InfoboxDataControl.css';

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

  return (
    <div className="infobox-data-control">
      <button
        className={`button-change-location ${getLocationStyle()}`}
        onClick={toggleChangeLocation}
      >
        {!isChangeLocationActive ? 'Change Location' : 'Cancel'}
        {!isChangeLocationActive ? <GiMove /> : <GiCancel />}
      </button>
      <button className="button-delete" onClick={onDeleteHandle}>
        Delete Marker !
        <AiFillDelete />
      </button>
    </div>
  );
}

export default InfoboxDataControl;
