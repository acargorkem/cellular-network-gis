import React from 'react';
import axios from 'axios';

const allowedExtensions = /(\.kmz|\.kml)$/i;

class ImportData extends React.Component {
  constructor(props) {
    super(props);
  }

  onFileChange(event) {
    const file = event.target.files[0];
    if (!allowedExtensions.exec(file.name)) {
      return alert('Only .kml and .kmz format allowed!');
    }

    const data = new FormData();
    data.append('file', file);

    axios
      .post('http://localhost:5000/file-upload', data)
      .then((res) => {
        console.log(res);
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }

  render() {
    return (
      <div>
        <input
          className="button-topleft"
          type="File"
          text="Upload File"
          onChange={this.onFileChange}
        />
      </div>
    );
  }
}

export default ImportData;
