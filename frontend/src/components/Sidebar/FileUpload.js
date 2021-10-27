import { connect } from 'react-redux';
import { fetchGeojsonFromApi } from '../../store/geojsonSlice';
import { useDropzone } from 'react-dropzone';
import './FileUpload.css';

const validTypes = [
  {
    mimeType: 'application/vnd.google-earth.kmz',
    extension: '.kmz',
  },
  {
    mimeType: 'application/vnd.google-earth.kml+xml',
    extension: '.kml',
  },
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
    accept: [...validTypes.map((item) => item.mimeType), ''],
  });

  const handleFileChange = (file) => {
    if (!file) return;
    if (!file.type) {
      const mimeType = getMimeTypeFromExtension(file);
      if (!mimeType) {
        return alert('Not valid file type');
      }
      file = new File([file], file.name, { type: mimeType });
    }
    const data = new FormData();
    data.append('file', file);
    props.fetchGeojsonFromApi(data);
  };

  const getMimeTypeFromExtension = (file) => {
    const name = file.name;
    const extension = name.slice(-4);
    const validType = validTypes.find((item) => item.extension == extension);
    if (!validType) return;
    return validType.mimeType;
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
