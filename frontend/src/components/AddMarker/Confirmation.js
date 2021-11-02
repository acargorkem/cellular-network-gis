import './Confirmation.css';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

export default function Confirmation({ onConfirm, onCancel }) {
  const [name, setName] = useState();

  const onBlurHandle = (e) => {
    e.preventDefault();
    const isValid = e.target.validity.valid;
    if (!isValid);
    setName(e.target.value);
  };

  const onConfirmHandle = () => {
    if (!name) {
      return alert('Please enter a valid name');
    }
    onConfirm(name);
  };
  const onCancelHandle = () => {
    onCancel();
  };

  return ReactDOM.createPortal(
    <div className="confirmation-container">
      <div className="confirmation-title">Add Marker</div>
      <div className="confirmation-context">
        <input
          required
          pattern=".{2,30}"
          placeholder="Marker Name"
          onBlur={onBlurHandle}
        ></input>
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
