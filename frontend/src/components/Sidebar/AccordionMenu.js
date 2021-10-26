import React, { useState, useEffect } from 'react';
import WorkingAreaSelector from '../WorkingAreaSelector';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import './AccordionMenu.css';

export default function AccordionMenu(props) {
  const [isActive, setIsActive] = useState(false);
  const [title, settitle] = useState('');

  useEffect(() => {
    const setStateDataFromProps = () => {
      if (!props.title) return;
      settitle(props.title);
    };
    setStateDataFromProps();
  }, [props]);

  //TODO: implement editable title
  //TODO: add camera icon next to title and handle cameraFlyTo method

  return (
    <React.Fragment>
      <div className="accordion">
        <div className="accordion-item">
          <div
            aria-hidden={true}
            className="accordion-title"
            onClick={() => setIsActive(!isActive)}
          >
            {title}
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
