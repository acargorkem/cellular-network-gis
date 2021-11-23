import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { fetchGeojsonFromApi } from '../../store/kmlSlice';
import { useDropzone } from 'react-dropzone';
import './FileUpload.css';
import { FiUpload } from 'react-icons/fi';

const allowedExtensions = /(\.kmz|\.kml)$/i;

function FileUpload({ isOpen, toggle, fetchGeojsonFromApi }) {
  const { acceptedFiles, getRootProps, getInputProps, open, isDragActive } =
    useDropzone({
      onDrop: (files) => handleFileChange(files[0]),
      multiple: false,
    });

  const handleFileChange = (file) => {
    if (!file) return;
    if (!allowedExtensions.exec(file.name)) {
      return alert('Only kml and kmz files are accepted!');
    }

    const data = new FormData();
    data.append('file', file);
    fetchGeojsonFromApi(data);
    toggle();
  };

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>{file.path}</li>
  ));

  if (!isOpen) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className="dropzone-container">
      <div className="dropzone-header">
        <button onClick={toggle}>Close</button>
      </div>
      <div className="dropzone-info-area">
        <h4>Drag & Drop files or </h4>
        <button type="button" onClick={open}>
          <span>Upload File</span>
          <span>
            <FiUpload className="upload-icon" />
          </span>
        </button>
      </div>
      <div
        {...getRootProps({
          className: 'dropzone-drop-area',
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop your files</p>
        ) : (
          <p>Drag & drop some files here, or click to select files</p>
        )}
      </div>
      <div className={'dropzone-file-accepted'}>
        <ul>{files}</ul>
      </div>
    </div>,
    document.getElementById('map-content-feature')
  );
}

export default connect(null, { fetchGeojsonFromApi })(FileUpload);
