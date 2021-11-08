import { connect } from 'react-redux';
import MarkerVisualization from './MarkerVisualization';
import FileVisualization from './FileVisualization';

function VisualizationContainer(props) {
  return (
    <>
      <MarkerVisualization data={props.markersData} />
      <FileVisualization
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
