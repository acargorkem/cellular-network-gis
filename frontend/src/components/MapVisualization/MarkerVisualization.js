import { connect } from 'react-redux';
import { setPropertyName, setDistance } from '../../store/markerSlice';
import { setInfoboxStatus, setInfoboxContent } from '../../store/infoboxSlice';
import Visualization from './Visualization';
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
      <Visualization
        data={props.data}
        setName={setName}
        setDistance={setDistance}
        openInfobox={openInfobox}
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
