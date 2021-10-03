import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const allowedExtensions = /(\.kmz|\.kml)$/i;

class ImportData extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDataChange(payload) {
    this.props.dispatchImportedData(payload);
  }

  async onFileChange(event) {
    const file = event.target.files[0];
    if (!allowedExtensions.exec(file.name)) {
      return alert('Only .kml and .kmz format allowed!');
    }

    const data = new FormData();
    data.append('file', file);

    const response = await axios.post(
      'http://localhost:5000/file-upload',
      data
    );
    this.handleDataChange(response.data);
  }

  render() {
    return (
      <div>
        <input
          className="button-topleft"
          type="File"
          text="Upload File"
          onChange={this.onFileChange.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    geospatialData: state.geospatialData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchImportedData: (payload) => {
      dispatch({
        type: 'DATA_IMPORTED',
        payload: payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportData);
