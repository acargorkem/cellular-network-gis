import { useState, useEffect } from 'react';
import CustomSelector from './CustomSelector';
import './WorkingAreaSelector.css';

function WorkingAreaSelector({ selectedDistance, arrayIndex, setDistance }) {
  const [currentDistances, setCurrentDistances] = useState(selectedDistance);

  useEffect(() => {
    setDistance(currentDistances, arrayIndex);
  }, [currentDistances, arrayIndex, setDistance]);

  const changeState = (key, value) => {
    const distance = { ...currentDistances };
    distance[key] = value;
    setCurrentDistances({ ...distance });
  };

  const handleChangeTop = ({ value }) => {
    changeState('top', value);
  };

  const handleChangeRight = ({ value }) => {
    changeState('right', value);
  };

  const handleChangeLeft = ({ value }) => {
    changeState('left', value);
  };

  return (
    <div className="selector-working-area">
      <div className="selector-text">Base station working area</div>
      <CustomSelector
        selectedDistance={currentDistances.top}
        handleChange={handleChangeTop}
      />
      <CustomSelector
        selectedDistance={currentDistances.right}
        handleChange={handleChangeRight}
      />
      <CustomSelector
        selectedDistance={currentDistances.left}
        handleChange={handleChangeLeft}
      />
    </div>
  );
}

export default WorkingAreaSelector;
