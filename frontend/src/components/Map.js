import React from 'react';
import './Map.css';
import baseConfig from '../config';
import { Viewer } from 'resium';
import { CesiumTerrainProvider, Ion, IonResource } from 'cesium';
import AddMarker from './AddMarker/AddMarker';
import VisualizationContainer from './MapVisualization/VisualizationContainer';

Ion.defaultAccessToken = baseConfig.cesiumIonToken;

export const terrainProvider = new CesiumTerrainProvider({
  url: IonResource.fromAssetId(1),
});

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.viewer = React.createRef();
  }

  render() {
    return (
      <Viewer
        full
        terrainProvider={terrainProvider}
        timeline={false}
        animation={false}
        baseLayerPicker={false}
        selectionIndicator={false}
        fullscreenButton={false}
        infoBox={false}
        navigationHelpButton={false}
        ref={this.viewer}
        requestRenderMode={true}
        maximumRenderTimeChange={Infinity}
      >
        <VisualizationContainer />
        <AddMarker />
      </Viewer>
    );
  }
}

export default Map;
