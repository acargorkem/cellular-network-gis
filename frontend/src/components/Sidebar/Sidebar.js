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
  const [isFileUpload, setIsFileUpload] = useState(false);

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

  const toggleFileUpload = () => {
    setIsFileUpload(!isFileUpload);
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
        <div>
          <h3> Title </h3>
          <MdArrowBackIosNew
            className="button sidebar-button active"
            onClick={toggleSidebar}
          />
        </div>
      )}

      {isSidebarShown && (
        <>
          <button onClick={toggleFileUpload}> Upload File</button>
          <FileUpload isOpen={isFileUpload} toggle={toggleFileUpload} />
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
