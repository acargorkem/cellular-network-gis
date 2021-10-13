import React from 'react';
import { connect } from 'react-redux';
import { Entity, PolygonGraphics } from 'resium';
import { Color } from 'cesium';
import { getCoverageAreaBoundsForFeatures } from '../services/coverageArea';

class CoverageArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coverageAreaBounds: [],
      coverageDistanceForMinus65Db: 250,
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (prevProps.geospatialData !== this.props.geospatialData) {
      const features = [...this.props.geospatialData.geoJson.features];
      this.setCoverageAreaBounds(features);
    }
  }

  setCoverageAreaBounds(features) {
    let distance = this.state.coverageDistanceForMinus65Db;
    let positions = getCoverageAreaBoundsForFeatures(features, distance);

    this.setState({
      coverageAreaBounds: [...positions],
    });
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
