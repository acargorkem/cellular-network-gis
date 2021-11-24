import { connect } from 'react-redux';
import { useState } from 'react';
import FileUpload from './FileUpload';
import './Sidebar.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdArrowBackIosNew } from 'react-icons/md';
import { ReactComponent as CommTowerIcon } from '../../assets/icons/communications-tower.svg';
import CoverageModelControl from '../CoverageModelControl/CoverageModelControl';
import AddMarkerToggleButton from '../AddMarker/AddMarkerToggleButton';
import { FiUpload } from 'react-icons/fi';
import { setInfoboxStatus } from '../../store/infoboxSlice';

//TODO:REFACTOR : make component from fileupload toggle logic
function Sidebar(props) {
  const [isSidebarShown, setIsSidebarShown] = useState(false);
  const [isFileUpload, setIsFileUpload] = useState(false);

  const toggleFileUpload = () => {
    props.setInfoboxStatus('inactive');
    setIsFileUpload(!isFileUpload);
  };

  const toggleSidebar = () => {
    setIsSidebarShown(!isSidebarShown);
  };

  const toggleStyle = () => {
    return isSidebarShown ? 'active' : '';
  };

  const toggleFileUploadStyle = () => {
    return isFileUpload ? 'active' : '';
  };

  return (
    <div className={`sidebar-container ${toggleStyle()}`}>
      {!isSidebarShown ? (
        <GiHamburgerMenu
          className={`button sidebar-button`}
          onClick={toggleSidebar}
        />
      ) : (
        <div className="sidebar-content">
          <div className="sidebar-title">
            <CommTowerIcon />
            <h3>Cellular Communication</h3>
            <MdArrowBackIosNew
              className="button sidebar-button active"
              onClick={toggleSidebar}
            />
          </div>
          <div className="sidebar-item">
            <div className="sidebar-item-buttons">
              <button
                className={toggleFileUploadStyle()}
                onClick={toggleFileUpload}
              >
                Upload File
                <FiUpload size="1.6em" />
              </button>
              <AddMarkerToggleButton />
            </div>
            <FileUpload isOpen={isFileUpload} toggle={toggleFileUpload} />
            <CoverageModelControl data={props.coverageAreaFile} />
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    coverageAreaFile: state.kmlData.file,
  };
};

const mapDispatchToProps = {
  setInfoboxStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
