import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { geojsonSlice } from '../../store/geojsonSlice';
import WorkingAreaSelector from '../WorkingAreaSelector';
import EditableText from '../EditableText';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import './AccordionMenu.css';

export default function AccordionMenu(props) {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  const editableTextOnChange = (text) => {
    dispatch(
      geojsonSlice.actions.setPropertyName({
        index: props.arrayIndex,
        name: text,
      })
    );
  };

  return (
    <React.Fragment>
      <div className="accordion">
        <div className="accordion-item">
          <div
            aria-hidden={true}
            className="accordion-title"
            onClick={() => setIsActive(!isActive)}
          >
            <EditableText
              content={props.title}
              onChange={editableTextOnChange}
            />
            <div className={'accordion-button-collapse'}>
              {isActive ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
            </div>
          </div>
          {isActive && <WorkingAreaSelector arrayIndex={props.arrayIndex} />}
        </div>
      </div>
    </React.Fragment>
  );
}
