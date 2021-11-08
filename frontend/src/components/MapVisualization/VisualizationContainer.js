import { useEffect } from 'react';
import { connect } from 'react-redux';
import MarkerVisualization from './MarkerVisualization';
import FileDataVisualization from './FileDataVisualization';

function VisualizationContainer(props) {
  useEffect(() => {
    props.getViewer.current.cesiumElement.scene.requestRender();
  }, [props]);

  return (
    <>
      <MarkerVisualization data={props.markersData} />
      <FileDataVisualization
        data={props.coverageAreaData}
        getCamera={props.getCamera}
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    coverageAreaData: state.coverageArea,
    firstCoords: state.coverageArea.firstCoords,
    markersData: state.markers,
  };
};

export default connect(mapStateToProps, null)(VisualizationContainer);
