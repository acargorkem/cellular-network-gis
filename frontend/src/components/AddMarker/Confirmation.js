import './Confirmation.css';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import WorkingAreaSelector from '../MapVisualization/WorkingAreaSelector';

export default function Confirmation({ onConfirm, onCancel }) {
  const [name, setName] = useState();
  const [isValid, setIsValid] = useState(false);
  const [coverageDistance, setCoverageDistance] = useState({
    top: 500,
    right: 500,
    left: 500,
  });

  const onBlurHandle = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const onChangeHandle = (e) => {
    const isValid = e.target.validity.valid;
    isValid ? setIsValid(true) : setIsValid(false);
  };

  const onConfirmHandle = () => {
    if (!isValid) {
      return alert('Please enter a valid name');
    }
    onConfirm(name, coverageDistance);
  };
  const onCancelHandle = () => {
    onCancel();
  };

  const setDistance = (distance) => {
    setCoverageDistance(distance);
  };

  return ReactDOM.createPortal(
    <div className="confirmation-container">
      <div className="confirmation-title">Add Base Station Marker</div>
      <div className="confirmation-context">
        <input
          required
          pattern=".{1,30}"
          placeholder="Marker Name"
          onBlur={onBlurHandle}
          onChange={onChangeHandle}
        ></input>
        {!isValid && (
          <div className="confirmation-message-invalid">
            *Marker name is required.
          </div>
        )}
      </div>
      <div className="confirmation-context">
        <WorkingAreaSelector
          selectedDistance={coverageDistance}
          setDistance={setDistance}
        />
      </div>
      <div className="confirmation-buttons">
        <AiOutlineCheck
          size="1.25em"
          onClick={onConfirmHandle}
          className="confirmation-icon"
        />
        <AiOutlineClose
          size="1.25em"
          onClick={onCancelHandle}
          className="confirmation-icon"
        />
      </div>
    </div>,
    document.getElementById('map-content-feature')
  );
}
