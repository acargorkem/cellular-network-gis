import { useState, useEffect } from 'react';
import CustomSelector from './CustomSelector';
import './WorkingAreaSelector.css';
import { BsArrowUp, BsArrowDownRight, BsArrowDownLeft } from 'react-icons/bs';

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
    <div className="working-area-selector__container">
      <h5 className="working-area-selector__title">
        Select base station working area
      </h5>

      <div className="working-area-selector__top-label">
        <span>Azimuth : 0&#176;</span>
      </div>
      <div className="working-area-selector__top">
        <CustomSelector
          selectedDistance={currentDistances.top}
          handleChange={handleChangeTop}
        />
      </div>
      <BsArrowUp className="working-area-selector__top-icon" />
      <div className="working-area-selector__right-label">
        <span>Azimuth : 120&#176;</span>
      </div>
      <div className="working-area-selector__right">
        <CustomSelector
          selectedDistance={currentDistances.right}
          handleChange={handleChangeRight}
        />
      </div>
      <BsArrowDownRight className="working-area-selector__right-icon" />
      <div className="working-area-selector__left-label">
        <span>Azimuth : 240&#176;</span>
      </div>
      <div className="working-area-selector__left">
        <CustomSelector
          selectedDistance={currentDistances.left}
          handleChange={handleChangeLeft}
        />
      </div>
      <BsArrowDownLeft className="working-area-selector__left-icon" />
    </div>
  );
}

export default WorkingAreaSelector;
