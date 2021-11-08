import { connect } from 'react-redux';
import { setPropertyName, setDistance } from '../../store/markerSlice';
import Visualization from './Visualization';

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

  return (
    <Visualization
      data={props.data}
      setName={setName}
      setDistance={setDistance}
    />
  );
}

const mapDispatchToProps = { setPropertyName, setDistance };

export default connect(null, mapDispatchToProps)(MarkerVisualization);
