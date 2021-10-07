import React from 'react';
import { connect } from 'react-redux';
import { Entity, PolygonGraphics } from 'resium';
import { Math as CesiumMath, Cartesian3, Color } from 'cesium';

class CoverageArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coverageArea: [],
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (prevProps.geospatialData !== this.props.geospatialData) {
      const features = [...this.props.geospatialData.geoJson.features];
      this.addPolygonGraphicsAroundFeatures(features);
    }
  }

  addPolygonGraphicsAroundFeatures(features) {
    let positions = [];
    features.forEach((feature) => {
      const lon = feature.geometry.coordinates[0];
      const lat = feature.geometry.coordinates[1];
      const height = feature.geometry.coordinates[2];
      let position = this.getHexagonBounds(lon, lat, height, 0.0025);
      positions.push(position);
    });
    this.setState({
      coverageArea: [...positions],
    });
  }

  getHexagonBounds(lon, lat, height, radius) {
    let bounds = [];
    for (let i = 0; i < 360; i += 60) {
      let radians = CesiumMath.toRadians(i);
      let position = Cartesian3.fromDegrees(
        lon + radius * Math.cos(radians),
        lat + radius * Math.sin(radians),
        height
      );
      bounds.push(position);
    }
    return bounds;
  }

  render() {
    const polygonGraphics = this.state.coverageArea.map(
      (coverageArea, index) => {
        return (
          <Entity key={index}>
            <PolygonGraphics
              hierarchy={coverageArea}
              material={Color.RED.withAlpha(0.5)}
            />
          </Entity>
        );
      }
    );
    return polygonGraphics;
  }
}

const mapStateToProps = (state) => {
  return {
    geospatialData: state.geospatialData,
  };
};

export default connect(mapStateToProps, null)(CoverageArea);
