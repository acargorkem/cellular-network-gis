import React from 'react';
import { connect } from 'react-redux';
import { Entity, PolygonGraphics } from 'resium';
import { Math as CesiumMath, Cartesian3, Color } from 'cesium';

const radiusOfEarthInMeters = 6371008.7714;

class CoverageArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coverageAreaBounds: [],
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
      let coverageAreaCenterPoints = this.getCoverageAreaCenterPoints(
        lon,
        lat,
        height,
        250
      );

      coverageAreaCenterPoints.forEach((point) => {
        let position = this.getHexagonBounds(point[0], point[1], point[2], 250);
        positions.push(position);
      });
    });
    this.setState({
      coverageAreaBounds: [...positions],
    });
  }

  getCoverageAreaCenterPoints(lonDegree, latDegree, height, radius) {
    let centerPositions = [];
    let d = radius / radiusOfEarthInMeters;
    let latRadian = CesiumMath.toRadians(latDegree);
    let lonRadian = CesiumMath.toRadians(lonDegree);
    for (let i = 0; i < 360; i += 120) {
      let radians = CesiumMath.toRadians(i);
      var newLatitudeInRadian = Math.asin(
        Math.sin(latRadian) * Math.cos(d) +
          Math.cos(latRadian) * Math.sin(d) * Math.cos(radians)
      );
      var newLongitudeInRadian =
        lonRadian +
        Math.atan2(
          Math.sin(radians) * Math.sin(d) * Math.cos(latRadian),
          Math.cos(d) - Math.sin(latRadian) * Math.sin(newLatitudeInRadian)
        );
      let position = [newLongitudeInRadian, newLatitudeInRadian, height];
      centerPositions.push(position);
    }
    return centerPositions;
  }

  getHexagonBounds(lonRadian, latRadian, height, radius) {
    let bounds = [];
    let d = radius / radiusOfEarthInMeters;
    for (let i = 0; i < 360; i += 60) {
      let radians = CesiumMath.toRadians(i);
      var newLatitudeInRadian = Math.asin(
        Math.sin(latRadian) * Math.cos(d) +
          Math.cos(latRadian) * Math.sin(d) * Math.cos(radians)
      );
      var newLongitudeInRadian =
        lonRadian +
        Math.atan2(
          Math.sin(radians) * Math.sin(d) * Math.cos(latRadian),
          Math.cos(d) - Math.sin(latRadian) * Math.sin(newLatitudeInRadian)
        );

      let position = Cartesian3.fromRadians(
        newLongitudeInRadian,
        newLatitudeInRadian,
        height
      );
      bounds.push(position);
    }
    return bounds;
  }

  render() {
    const polygonGraphics = this.state.coverageAreaBounds.map(
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
