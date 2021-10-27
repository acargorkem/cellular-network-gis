import React from 'react';
import { connect } from 'react-redux';
import { GeoJsonDataSource } from 'resium';
import CoverageArea from './CoverageArea';
import antennaLogo from '../assets/icons/communications-tower.svg';
import Infobox from './Infobox';
import { cameraFlyToDestination } from '../services/cameraFlytoCoords';

class Visualization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInfoboxActive: false,
      infoBoxIndex: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.coverageAreaGeojson !== this.props.coverageAreaGeojson) {
      if (prevProps.firstCoords !== this.props.firstCoords) {
        const firstCoords = [...this.props.firstCoords];
        this.cameraFlyToLoadedData(firstCoords);
      }
    }
  }

  cameraFlyToLoadedData(coords) {
    const camera = this.props.getCamera.current.cesiumElement;
    cameraFlyToDestination(camera, coords);
  }

  onLoadHandle(event) {
    this.changeIcons(event);
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
    firstCoords: state.coverageArea.firstCoords,
  };
};

export default connect(mapStateToProps, null)(Visualization);
