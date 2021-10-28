import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import FileUpload from './FileUpload';
import AccordionMenu from './AccordionMenu';
import './Sidebar.css';

function Sidebar({ coverageAreaGeojson }) {
  const [isSidebarShown, setIsSidebarShown] = useState(false);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    if (coverageAreaGeojson) {
      setFeatures(coverageAreaGeojson.features);
    }
  }, [coverageAreaGeojson]);

  const renderAccordionMenu = () => {
    return features.map((feature, index) => {
      return (
        <AccordionMenu
          title={feature.properties.name}
          key={index}
          arrayIndex={index}
        />
      );
    });
  };

  const toggleSidebar = () => {
    setIsSidebarShown(!isSidebarShown);
  };

  const toggleStyle = () => {
    return isSidebarShown ? 'active' : '';
  };

  return (
    <div className={`sidebar-container ${toggleStyle()}`}>
      <button
        className={`button sidebar-button ${toggleStyle()}`}
        onClick={toggleSidebar}
      ></button>
      {isSidebarShown && (
        <>
          <FileUpload />
          {renderAccordionMenu()}
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    coverageAreaGeojson: state.coverageArea.geoJson,
  };
};

export default connect(mapStateToProps, null)(Sidebar);
