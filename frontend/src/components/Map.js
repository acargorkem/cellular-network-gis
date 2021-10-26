import React from 'react';
import './Map.css';
import baseConfig from '../config';
import { Viewer, Camera } from 'resium';
import {
  Cartesian2,
  Math as CesiumMath,
  sampleTerrainMostDetailed,
  CesiumTerrainProvider,
  Ion,
  IonResource,
} from 'cesium';

import Visualization from './Visualization';

Ion.defaultAccessToken = baseConfig.cesiumIonToken;

export const terrainProvider = new CesiumTerrainProvider({
  url: IonResource.fromAssetId(1),
});

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.cesium = React.createRef();
    this.camera = React.createRef();
    this.state = {
      latitude: 0,
      longitude: 0,
      height: 0,
    };
  }

  componentDidMount() {}

  getLocationFromScreenXY(x, y) {
    const scene = this.viewer.scene;
    if (!scene) return;
    const ellipsoid = scene.globe.ellipsoid;
    const cartesian = scene.camera.pickEllipsoid(
      new Cartesian2(x, y),
      ellipsoid
    );
    if (!cartesian) return;
    let cartographic = ellipsoid.cartesianArrayToCartographicArray([cartesian]);
    sampleTerrainMostDetailed(terrainProvider, cartographic).then(
      (updatedPositions) => {
        let latitude = CesiumMath.toDegrees(updatedPositions[0].latitude);
        let longitude = CesiumMath.toDegrees(updatedPositions[0].longitude);
        let height = updatedPositions[0].height;

        this.setState({ latitude, longitude, height });
      }
    );
  }

  render() {
    return (
      <Viewer
        full
        terrainProvider={terrainProvider}
        timeline={false}
        animation={false}
        baseLayerPicker={false}
        geocoder={false}
        selectionIndicator={false}
        fullscreenButton={false}
        infoBox={false}
        ref={(e) => {
          this.viewer = e ? e.cesiumElement : null;
        }}
        onMouseMove={(e) => {
          this.getLocationFromScreenXY(e.endPosition.x, e.endPosition.y);
        }}
      >
        <Camera ref={this.camera} />
        <Visualization getCamera={this.camera} />
      </Viewer>
    );
  }
}

export default Map;
