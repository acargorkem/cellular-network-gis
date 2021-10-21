import { connect } from 'react-redux';
import { fetchGeojsonFromApi } from '../../store/geojsonSlice';
import { useDropzone } from 'react-dropzone';
import './FileUpload.css';

const acceptedMimeTypes = [
  'application/vnd.google-earth.kmz',
  'application/vnd.google-earth.kml+xml',
];

function FileUpload(props) {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop: (files) => handleFileChange(files[0]),
    multiple: false,
    accept: acceptedMimeTypes,
  });

  const handleFileChange = (file) => {
    if (!file) return;
    const data = new FormData();
    data.append('file', file);
    props.fetchGeojsonFromApi(data);
  };

  const changeStyle = (accept, reject) => {
    if (accept) {
      return 'accept';
    } else if (reject) {
      return 'reject';
    }
    return '';
  };

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>{file.path}</li>
  ));

  return (
    <section className="sidebar-dropzone-container">
      <div
        {...getRootProps({
          className: `sidebar-dropzone ${changeStyle(
            isDragAccept,
            isDragReject
          )}`,
        })}
      >
        <input {...getInputProps()} />
        <p>Drag & drop file, or click to select file</p>
      </div>
      <aside className={'sidebar-dropzone-file'}>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}

export default connect(null, { fetchGeojsonFromApi })(FileUpload);
