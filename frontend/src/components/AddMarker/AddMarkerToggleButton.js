import { RiMapPinAddLine } from 'react-icons/ri';
import { connect } from 'react-redux';
import { toggleIsAddMarkerActive } from '../../store/markerSlice';
import { setInfoboxStatus } from '../../store/infoboxSlice';

function AddMarkerToggleButton(props) {
  const toggleIsActive = () => {
    props.setInfoboxStatus('inactive');
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

const mapDispatchToProps = { toggleIsAddMarkerActive, setInfoboxStatus };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMarkerToggleButton);
