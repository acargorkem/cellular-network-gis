import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import FileUpload from './FileUpload';
import AccordionMenu from './AccordionMenu';
import SidebarToggleButton from './SidebarToggleButton';
import './Sidebar.css';

function Sidebar({ coverageAreaGeojson, isSidebarShown }) {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    if (coverageAreaGeojson) {
      setFeatures(coverageAreaGeojson.features);
    }
  }, [coverageAreaGeojson]);

  return (
    <>
      <SidebarToggleButton />
      {isSidebarShown && (
        <div className="sidebar-container">
          <FileUpload />
          {features &&
            features.map((feature, index) => {
              return (
                <AccordionMenu
                  title={feature.properties.name}
                  key={index}
                  arrayIndex={index}
                />
              );
            })}
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    coverageAreaGeojson: state.coverageArea.geoJson,
    isSidebarShown: state.sidebar.isSidebarShown,
  };
};

export default connect(mapStateToProps, null)(Sidebar);
