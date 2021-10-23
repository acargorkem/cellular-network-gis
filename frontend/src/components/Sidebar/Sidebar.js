import React from 'react';
import { connect } from 'react-redux';
import SidebarToggleButton from './SidebarToggleButton';
import FileUpload from './FileUpload';
import './Sidebar.css';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const toggleStyle = () => {
      return this.props.isSidebarShown ? 'active' : 'inactive';
    };
    return (
      <div className={'siderbar-container'}>
        <SidebarToggleButton addClass={toggleStyle()} />
        <div className={`sidebar ${toggleStyle()}`}>
          <FileUpload />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    coverageAreaGeojson: state.coverageArea.geoJson,
    isSidebarShown: state.sidebar.isSidebarShown,
  };
};

export default connect(mapStateToProps, null)(Sidebar);
