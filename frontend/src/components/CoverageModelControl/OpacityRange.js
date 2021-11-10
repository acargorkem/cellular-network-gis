import './OpacityRange.css';
import { useState } from 'react';

function OpacityRange() {
  const [value, setValue] = useState(50);

  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className="opacity-range-container">
      <span>Opacity:%{value}</span>
      <input type="range" onChange={onChange}></input>
    </div>
  );
}

export default OpacityRange;
