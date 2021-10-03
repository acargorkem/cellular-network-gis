import React from 'react';
import { connect } from 'react-redux';
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
import Visualization from './Visualization';

const terrainProvider = createWorldTerrain();
// const pointGraphics = { pixelSize: 10 };

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.cesium = React.createRef();
  }

  componentDidMount() {}
  getLocationFromScreenXY(x, y) {
    const scene = this.viewer.scene;
    if (!scene) return;
    const ellipsoid = scene.globe.ellipsoid;
    // console.log(ellipsoid);
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

        return { latitude, longitude, height };
      }
    );
  }

  onDataChange() {
    console.log(this.props.importedData);
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
        <Visualization />
      </Viewer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    importedData: state.importedData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dataImported: () =>
      dispatch({
        type: 'DATA_IMPORTED',
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
