import { useEffect, useContext } from 'react';
import {
  setPropertyName,
  setDistance,
  deleteFeature,
  updatePosition,
} from '../../store/kmlSlice';
import { setInfoboxStatus, setInfoboxContent } from '../../store/infoboxSlice';
import { connect } from 'react-redux';
import CoverageDataVisualization from './CoverageDataVisualization';
import { cameraFlyToDestination } from '../../services/cameraFlytoCoords';
import Infobox from './Infobox';
import { CesiumContext } from 'resium';

function FileDataVisualization(props) {
  const cesiumContext = useContext(CesiumContext);

  useEffect(() => {
    const cameraFlyToLoadedData = (coords) => {
      const camera = cesiumContext.camera;
      cameraFlyToDestination(camera, coords);
    };
    if (!props.data.firstCoords) {
      return;
    }
    const firstCoords = [...props.data.firstCoords];
    cameraFlyToLoadedData(firstCoords);
  }, [props.data.firstCoords, cesiumContext.camera]);

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
    props.setInfoboxStatus('fileData');
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
      {props.infoboxStatus == 'fileData' && (
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
)(FileDataVisualization);
