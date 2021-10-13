import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  Cartographic,
  Math as CesiumMath,
  sampleTerrainMostDetailed,
} from 'cesium';

const allowedExtensions = /(\.kmz|\.kml)$/i;

class ImportData extends React.Component {
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

    const response = await axios.post(
      'http://localhost:5000/file-upload',
      data
    );

    if (response.data.geoJson.features.length <= 0) {
      return alert('Not valid datatype');
    }

    let features = response.data.geoJson.features;
    const newPositions = await this.getRadianCoordsWithHeight(features);

    this.updateFeaturesPositions(features, newPositions);

    this.props.dispatchImportedData(response.data);
  }

  async getRadianCoordsWithHeight(features) {
    let positions = this.getRadianCoordsArrayFromFeatures(features);
    return sampleTerrainMostDetailed(this.props.getTerrainProvider, positions);
  }

  updateFeaturesPositions(features, newPositions) {
    features.map((feature, index) => {
      feature.geometry.coordinates[0] = CesiumMath.toDegrees(
        newPositions[index].longitude
      );
      feature.geometry.coordinates[1] = CesiumMath.toDegrees(
        newPositions[index].latitude
      );
      feature.geometry.coordinates[2] = newPositions[index].height;
    });
  }

  getRadianCoordsArrayFromFeatures(features) {
    let radianCoordsArray = [];
    for (const feature of features) {
      let coords = feature.geometry.coordinates;
      let longitude = CesiumMath.toRadians(coords[0]);
      let latitude = CesiumMath.toRadians(coords[1]);
      let height = coords[2];
      let position = new Cartographic(longitude, latitude, height);
      radianCoordsArray.push(position);
    }
    return radianCoordsArray;
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

export default connect(null, mapDispatchToProps)(ImportData);
