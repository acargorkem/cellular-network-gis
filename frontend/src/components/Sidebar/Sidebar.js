import React from 'react';
import FileUpload from './FileUpload';
import './Sidebar.css';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSidebarActive: true,
    };
  }

  sidebarToggle() {
    this.setState((prevState) => ({
      isSidebarActive: !prevState.isSidebarActive,
    }));
  }

  render() {
    const toggleStyle = () => {
      return this.state.isSidebarActive ? 'active' : 'inactive';
    };
    return (
      <div className={'siderbar-container'}>
        <button
          className={`button-sidebar ${toggleStyle()}`}
          onClick={this.sidebarToggle.bind(this)}
        >
          SideBar On/Off
        </button>
        <div className={`sidebar ${toggleStyle()}`}>
          <FileUpload />
        </div>
      </div>
    );
  }
}

export default Sidebar;
