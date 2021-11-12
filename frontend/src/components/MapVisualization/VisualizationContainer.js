import { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import MarkerVisualization from './MarkerVisualization';
import FileDataVisualization from './FileDataVisualization';
import { CesiumContext } from 'resium';

function VisualizationContainer(props) {
  const cesiumContext = useContext(CesiumContext);

  useEffect(() => {
    cesiumContext.scene.requestRender();
  }, [props, cesiumContext]);

  return (
    <>
      <MarkerVisualization
        data={props.markersData}
        opacity={props.coverageOpacity}
      />
      <FileDataVisualization
        opacity={props.coverageOpacity}
        data={props.coverageAreaData}
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    coverageAreaData: state.coverageArea,
    firstCoords: state.coverageArea.firstCoords,
    markersData: state.markers,
    coverageOpacity: state.coverageControl.opacity,
  };
};

export default connect(mapStateToProps, null)(VisualizationContainer);
