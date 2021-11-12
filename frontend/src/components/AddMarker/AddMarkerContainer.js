import { connect } from 'react-redux';
import { addMarker, setIsAddMarkerActive } from '../../store/markerSlice';
import AddMarker from './AddMarker';

function AddMarkerContainer(props) {
  const addMarkerHandle = (marker) => {
    props.addMarker(marker);
  };

  const closeAddMarkerHandle = () => {
    props.setIsAddMarkerActive(false);
  };

  return (
    <>
      {props.isAddMarkerActive && (
        <AddMarker addMarker={addMarkerHandle} close={closeAddMarkerHandle} />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isAddMarkerActive: state.markers.isAddMarkerActive,
  };
};

const mapDispatchToProps = {
  addMarker,
  setIsAddMarkerActive,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMarkerContainer);
