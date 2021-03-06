import { connect } from 'react-redux';
import {
  setPropertyName,
  setDistance,
  deleteFeature,
  updatePosition,
} from '../../store/markerSlice';
import { setInfoboxStatus, setInfoboxContent } from '../../store/infoboxSlice';
import CoverageDataVisualization from './CoverageDataVisualization';
import Infobox from './Infobox';

function MarkerVisualization(props) {
  const setName = (name, index) => {
    props.setPropertyName({
      name,
      index,
    });
  };

  const setDistance = (value, index) => {
    props.setDistance({ value, index });
  };

  const openInfobox = (content) => {
    props.setInfoboxStatus('inactive');
    props.setInfoboxContent(content);
    props.setInfoboxStatus('markerData');
  };

  const deleteMarker = (index) => {
    props.deleteFeature({ index });
  };

  const updateMarkerPosition = (coords, index) => {
    props.updatePosition({ coords, index });
  };

  return (
    <>
      <CoverageDataVisualization
        data={props.data}
        setName={setName}
        setDistance={setDistance}
        openInfobox={openInfobox}
        opacity={props.opacity}
      />
      {props.infoboxStatus == 'markerData' && (
        <Infobox
          setDistance={setDistance}
          setName={setName}
          deleteMarker={deleteMarker}
          updateMarkerPosition={updateMarkerPosition}
        />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    infoboxStatus: state.infobox.status,
  };
};

const mapDispatchToProps = {
  setPropertyName,
  setDistance,
  deleteFeature,
  setInfoboxStatus,
  setInfoboxContent,
  updatePosition,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarkerVisualization);
