import './ColorModelControl.css';
import React from 'react';

function ColorModelControl() {
  const data = [
    {
      color: 'rgb(0, 255, 0)',
      label: '-65 dBm',
    },
    {
      color: 'rgb(255, 227, 0)',
      label: '-75 dBm',
    },
    {
      color: 'rgb(255, 0, 0)',
      label: '-85 dBm',
    },
  ];

  return (
    <div className="color-control-container">
      <div className="color-control-items">
        {data.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div
                className="color-control-colorbox"
                style={{ background: item.color }}
              ></div>
              <div className=" color-control-label">{item.label}</div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default ColorModelControl;
