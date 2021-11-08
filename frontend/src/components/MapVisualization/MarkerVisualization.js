import { connect } from 'react-redux';
import { setPropertyName, setDistance } from '../../store/markerSlice';
import Visualization from './Visualization';

function MarkerVisualization(props) {
  return <Visualization data={props.data} />;
}

const mapDispatchToProps = { setPropertyName, setDistance };

export default connect(null, mapDispatchToProps)(MarkerVisualization);
