import React from 'react';
import { connect } from 'react-redux';
import SidebarToggleButton from './SidebarToggleButton';
import FileUpload from './FileUpload';
import AccordionMenu from './AccordionMenu';
import './Sidebar.css';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const toggleStyle = () => {
      return this.props.isSidebarShown ? 'active' : 'inactive';
    };

    const addAccordionMenus = (data) => {
      if (!data) return;
      return data.features.map((feature, index) => {
        return (
          <AccordionMenu
            title={feature.properties.name}
            key={index}
            arrayIndex={index}
          />
        );
      });
    };

    return (
      <div className={'sidebar-container'}>
        <SidebarToggleButton addClass={toggleStyle()} />
        <div className={`sidebar ${toggleStyle()}`}>
          <FileUpload />
          {addAccordionMenus(this.props.coverageAreaGeojson)}
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
