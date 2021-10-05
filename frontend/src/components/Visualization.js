import React from 'react';
import { connect } from 'react-redux';
import { GeoJsonDataSource } from 'resium';
import { Math as CesiumMath, Cartographic } from 'cesium';

class Visualization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShown: false,
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (prevProps.geospatialData !== this.props.geospatialData) {
      const firstCoordsInGeoJson = [
        ...this.props.geospatialData.geoJson.features[0].geometry.coordinates,
      ];
      this.cameraFlyToLoadedData(firstCoordsInGeoJson);
      this.visualizeGeoJsonDataSource();
    }
  }

  visualizeGeoJsonDataSource() {
    this.setState({ isShown: true });
  }

  cartographicToCartesian(cartographicCoords) {
    const latitude = CesiumMath.toRadians(cartographicCoords[0]);
    const longitude = CesiumMath.toRadians(cartographicCoords[1]);
    const height = cartographicCoords[2];

    const cartographic = new Cartographic(latitude, longitude, height);
    const cartesian = Cartographic.toCartesian(cartographic);
    return cartesian;
  }

  cameraFlyToLoadedData(cartographicDestination) {
    cartographicDestination[2] += 10000;
    const destination = this.cartographicToCartesian(cartographicDestination);
    const camera = this.props.getCamera.current.cesiumElement;
    camera.flyTo({
      destination: destination,
      duration: 5,
    });
  }

  render() {
    return (
      <GeoJsonDataSource
        data={this.props.geospatialData.geoJson}
        show={this.state.isShown}
      ></GeoJsonDataSource>
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

export default connect(mapStateToProps, mapDispatchToProps)(Visualization);
