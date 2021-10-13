import React from 'react';
import { connect } from 'react-redux';
import { GeoJsonDataSource } from 'resium';
import { Math as CesiumMath, Cartographic } from 'cesium';
import CoverageArea from './CoverageArea';
import antennaLogo from '../assets/icons/communications-tower.svg';

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
      this.setState({ isShown: true });
    }
  }

  cartographicToCartesian(cartographicCoords) {
    const longitude = CesiumMath.toRadians(cartographicCoords[0]);
    const latitude = CesiumMath.toRadians(cartographicCoords[1]);
    const height = cartographicCoords[2];

    const cartographic = new Cartographic(longitude, latitude, height);
    const cartesian = Cartographic.toCartesian(cartographic);
    return cartesian;
  }

  cameraFlyToLoadedData(cartographicDestination) {
    cartographicDestination[2] += 10000;
    const destination = this.cartographicToCartesian(cartographicDestination);
    const camera = this.props.getCamera.current.cesiumElement;
    camera.flyTo({
      destination: destination,
      duration: 4,
    });
  }
  onLoadHandle(event) {
    // You can process the data source here
    event.entities.values.map((item) => {
      item.billboard.image = antennaLogo;
    });
  }

  render() {
    return (
      <GeoJsonDataSource
        data={this.props.geospatialData.geoJson}
        show={this.state.isShown}
        markerSize={36}
        onLoad={(event) => this.onLoadHandle(event)}
      >
        <CoverageArea />
      </GeoJsonDataSource>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    geospatialData: state.geospatialData,
  };
};

export default connect(mapStateToProps, null)(Visualization);
