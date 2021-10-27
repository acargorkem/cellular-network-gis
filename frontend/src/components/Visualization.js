import React from 'react';
import { connect } from 'react-redux';
import { GeoJsonDataSource } from 'resium';
import { Math as CesiumMath, Cartographic } from 'cesium';
import CoverageArea from './CoverageArea';
import antennaLogo from '../assets/icons/communications-tower.svg';
import Infobox from './Infobox';

class Visualization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstDataLoaded: false,
      isInfoboxActive: false,
      infoBoxIndex: null,
    };
  }

  componentDidUpdate() {}

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
    this.changeIcons(event);
    if (this.state.isFirstDataLoaded) {
      return;
    }
    const firstCoordsInGeoJson = [
      ...this.props.coverageAreaGeojson.features[0].geometry.coordinates,
    ];
    this.cameraFlyToLoadedData(firstCoordsInGeoJson);
    this.setState({
      isFirstDataLoaded: true,
    });
  }

  changeIcons(event) {
    event.entities.values.map((item) => {
      item.billboard.image = antennaLogo;
      item.billboard.scale = 1.5;
    });
  }

  openInfobox(entity) {
    this.setState({
      isInfoboxActive: false,
    });
    let id = entity.id.id;
    let collection = entity.id.entityCollection.values.map((item) => item.id);
    let index = collection.indexOf(id);
    this.setState({
      isInfoboxActive: true,
      infoBoxIndex: index,
    });
  }

  closeInfobox() {
    this.setState({
      isInfoboxActive: false,
    });
  }

  render() {
    return (
      <GeoJsonDataSource
        // TODO: CLUSTER EFFECT- SMALL ICONS ON ZOOM OUT
        data={this.props.coverageAreaGeojson}
        onLoad={(event) => this.onLoadHandle(event)}
        onClick={(_, entity) => this.openInfobox(entity)}
        onLoading={this.onLoadingHandle}
      >
        {this.state.isInfoboxActive && (
          <Infobox
            isInfoboxActive={this.state.isInfoboxActive}
            closeInfobox={this.closeInfobox.bind(this)}
            arrayIndex={this.state.infoBoxIndex}
          />
        )}
        <CoverageArea />
      </GeoJsonDataSource>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    coverageAreaGeojson: state.coverageArea.geoJson,
  };
};

export default connect(mapStateToProps, null)(Visualization);
