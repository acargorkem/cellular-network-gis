import React from 'react';
import { connect } from 'react-redux';
import { fetchGeojsonFromApi } from '../../store/geojsonSlice';

const allowedExtensions = /(\.kmz|\.kml)$/i;

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
  }

  async onFileChange(event) {
    const file = event.target.files[0];
    if (!allowedExtensions.exec(file.name)) {
      return alert('Only .kml and .kmz format allowed!');
    }

    const data = new FormData();
    data.append('file', file);

    this.props.fetchGeojsonFromApi(data);
  }

  render() {
    return (
      <div>
        <input
          className="file-upload"
          type="File"
          text="Upload File"
          onChange={this.onFileChange.bind(this)}
        />
      </div>
    );
  }
}

export default connect(null, { fetchGeojsonFromApi })(FileUpload);
