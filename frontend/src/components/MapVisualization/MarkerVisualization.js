import { connect } from 'react-redux';
import { setPropertyName, setDistance } from '../../store/markerSlice';
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
    props.setInfoboxContent(content);
    props.setInfoboxStatus('markerData');
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
        <Infobox setDistance={setDistance} setName={setName} />
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
  setInfoboxStatus,
  setInfoboxContent,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MarkerVisualization);
