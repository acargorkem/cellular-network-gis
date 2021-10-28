import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import FileUpload from './FileUpload';
import AccordionMenu from './AccordionMenu';
import './Sidebar.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdArrowBackIosNew } from 'react-icons/md';

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
      {!isSidebarShown ? (
        <GiHamburgerMenu
          className={`button sidebar-button`}
          onClick={toggleSidebar}
        />
      ) : (
        <MdArrowBackIosNew
          className="button sidebar-button active"
          onClick={toggleSidebar}
        />
      )}

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
