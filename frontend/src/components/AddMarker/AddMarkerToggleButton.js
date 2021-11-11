import { RiMapPinAddLine } from 'react-icons/ri';
import { connect } from 'react-redux';
import { toggleIsAddMarkerActive } from '../../store/markerSlice';

function AddMarkerToggleButton(props) {
  const toggleIsActive = () => {
    props.toggleIsAddMarkerActive();
  };

  const toggleStyle = () => {
    return props.isActive ? 'active' : '';
  };

  return (
    <button className={toggleStyle()} onClick={toggleIsActive}>
      Add Marker
      <RiMapPinAddLine size="1.6em" />
    </button>
  );
}

const mapStateToProps = (state) => {
  return {
    isActive: state.markers.isAddMarkerActive,
  };
};

const mapDispatchToProps = { toggleIsAddMarkerActive };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMarkerToggleButton);
