import './OpacityRange.css';
import { useState } from 'react';
import { connect } from 'react-redux';
import { setOpacity } from '../../store/coverageControlSlice';

function OpacityRange(props) {
  const [value, setValue] = useState(50);

  const onChange = (e) => {
    setValue(e.target.value);
    props.setOpacity(e.target.value);
  };

  return (
    <div className="opacity-range-container">
      <span>Opacity:%{value}</span>
      <input type="range" onChange={onChange}></input>
    </div>
  );
}
const mapDispatchToProps = {
  setOpacity,
};

export default connect(null, mapDispatchToProps)(OpacityRange);
