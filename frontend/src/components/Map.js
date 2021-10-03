import React from 'react';
import './Map.css';
import { Viewer } from 'resium';
import {
  createWorldTerrain,
  Cartesian2,
  Math as CesiumMath,
  sampleTerrainMostDetailed,
  // PinBuilder,
} from 'cesium';

import ImportData from './ImportData';

const terrainProvider = createWorldTerrain();
// const pointGraphics = { pixelSize: 10 };

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.cesium = React.createRef();
  }
  componentDidMount() {
    const { viewer } = this;
    if (viewer) {
      console.log('assigned');
    }
  }
  getLocationFromScreenXY(x, y) {
    //const scene = this.viewer.current?.cesiumElement?.scene;
    const scene = this.viewer.scene;
    if (!scene) return;
    const ellipsoid = scene.globe.ellipsoid;
    // console.log(ellipsoid);
    const cartesian = scene.camera.pickEllipsoid(
      new Cartesian2(x, y),
      ellipsoid
    );

    if (!cartesian) return;
    // let { latitude, longitude, height } =
    //   ellipsoid.cartesianToCartographic(cartesian);
    let cartographic = ellipsoid.cartesianArrayToCartographicArray([cartesian]);
    // console.log(latitude);
    // console.log(longitude);
    // latitude = CesiumMath.toDegrees(latitude);
    // longitude = CesiumMath.toDegrees(longitude);
    // console.log(cartesian);
    // console.log('Cartographic:', latitude, longitude, height);

    sampleTerrainMostDetailed(terrainProvider, cartographic).then(
      (updatedPositions) => {
        let latitude = CesiumMath.toDegrees(updatedPositions[0].latitude);
        let longitude = CesiumMath.toDegrees(updatedPositions[0].longitude);
        let height = updatedPositions[0].height;

        return { latitude, longitude, height };
      }
    );
  }

  // async getPositionsFromSampleTerrain(latitude, longitude, height) {
  // try {
  // const result = await sampleTerrain(this.viewer.terrainProvider, 9, [
  // latitude,
  // longitude,
  // height,
  // ]);

  // return Promise.resolve(result);
  // } catch (err) {
  // return Promise.reject(err);
  // }
  // }

  loadKMLData() {
    console.log('loaded', this);
  }

  render() {
    return (
      <Viewer
        full
        terrainProvider={terrainProvider}
        timeline={false}
        animation={false}
        // baseLayerPicker={false}
        ref={(e) => {
          this.viewer = e ? e.cesiumElement : null;
        }}
        onMouseMove={(e) => {
          // let location =
          this.getLocationFromScreenXY(e.endPosition.x, e.endPosition.y);
          // console.log(location);
        }}
      >
        <ImportData />
      </Viewer>
    );
  }
}

export default Map;
