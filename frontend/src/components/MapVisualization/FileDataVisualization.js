import { useEffect } from 'react';
import { setPropertyName, setDistance } from '../../store/geojsonSlice';
import { setInfoboxStatus, setInfoboxContent } from '../../store/infoboxSlice';
import { connect } from 'react-redux';
import CoverageDataVisualization from './CoverageDataVisualization';
import { cameraFlyToDestination } from '../../services/cameraFlytoCoords';
import Infobox from './Infobox';

function FileDataVisualization(props) {
  useEffect(() => {
    const cameraFlyToLoadedData = (coords) => {
      const camera = props.getCamera.current.cesiumElement;
      cameraFlyToDestination(camera, coords);
    };
    if (!props.data.firstCoords) {
      return;
    }
    const firstCoords = [...props.data.firstCoords];
    cameraFlyToLoadedData(firstCoords);
  }, [props.data.firstCoords, props.getCamera]);

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
    props.setInfoboxStatus('fileData');
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
      {props.infoboxStatus == 'fileData' && (
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
)(FileDataVisualization);
