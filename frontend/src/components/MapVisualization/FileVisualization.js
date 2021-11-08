import { useEffect } from 'react';
import { setPropertyName, setDistance } from '../../store/geojsonSlice';
import { connect } from 'react-redux';
import Visualization from './Visualization';
import { cameraFlyToDestination } from '../../services/cameraFlytoCoords';

function FileVisualization(props) {
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

  return <Visualization data={props.data} />;
}

const mapDispatchToProps = { setPropertyName, setDistance };

export default connect(null, mapDispatchToProps)(FileVisualization);
