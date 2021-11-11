import './CoverageModelControl.css';
import ColorModelControl from './ColorModelControl';
import OpacityRange from './OpacityRange';

function DataInfo() {
  return (
    <div className="control-model-container">
      <div className="control-model-title">
        <h4>Coverage Area Model</h4>
      </div>
      <div className="control-model-control">
        <ColorModelControl />
        <OpacityRange />
      </div>
    </div>
  );
}

export default DataInfo;
