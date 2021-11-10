import './CoverageModelControl.css';
import OpacityRange from './OpacityRange';

function DataInfo(props) {
  console.log(props);
  return (
    <div className="control-model-container">
      <div className="control-model-title">
        <h4>Coverage Area Model</h4>
      </div>
      <div className="control-model-control">
        <OpacityRange />
      </div>
    </div>
  );
}

export default DataInfo;
