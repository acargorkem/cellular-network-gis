import React from 'react';
import { connect } from 'react-redux';
import './Map.css';
import { Viewer } from 'resium';
import {
  createWorldTerrain,
  Cartesian2,
  Math as CesiumMath,
  sampleTerrainMostDetailed,
} from 'cesium';

import ImportData from './ImportData';
import Visualization from './Visualization';

const terrainProvider = createWorldTerrain();

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.cesium = React.createRef();
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
        ref={(e) => {
          this.viewer = e ? e.cesiumElement : null;
        }}
        onMouseMove={(e) => {
          this.getLocationFromScreenXY(e.endPosition.x, e.endPosition.y);
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

export default connect(mapStateToProps, mapDispatchToProps)(Map);
