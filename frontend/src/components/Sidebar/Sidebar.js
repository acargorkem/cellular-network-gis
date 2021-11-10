import { connect } from 'react-redux';
import { useState } from 'react';
import FileUpload from './FileUpload';
import './Sidebar.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdArrowBackIosNew } from 'react-icons/md';
import { ReactComponent as CommTowerIcon } from '../../assets/icons/communications-tower.svg';
import CoverageModelControl from '../CoverageModelControl/CoverageModelControl';

function Sidebar(props) {
  const [isSidebarShown, setIsSidebarShown] = useState(false);
  const [isFileUpload, setIsFileUpload] = useState(false);

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
            <button className="upload-file-button" onClick={toggleFileUpload}>
              Upload File
            </button>
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
    coverageAreaFile: state.coverageArea.file,
  };
};

export default connect(mapStateToProps, null)(Sidebar);
