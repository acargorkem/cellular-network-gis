import React from 'react';
import FileUpload from './FileUpload';
import './Sidebar.css';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'sidebar'}>
        <FileUpload />
      </div>
    );
  }
}

export default Sidebar;
