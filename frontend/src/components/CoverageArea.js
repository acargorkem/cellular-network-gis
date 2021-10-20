import React from 'react';
import { connect } from 'react-redux';
import { Entity, PolygonGraphics } from 'resium';
import { Color } from 'cesium';
import { getCoverageAreaBoundsForFeatures } from '../services/coverageArea';

class CoverageArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boundsMinus65Dbm: [],
      distanceMinus65Dbm: 100,
      boundsMinus80Dbm: [],
      distanceMinus80Dbm: 150,
      boundsMinus100Dbm: [],
      distanceMinus100Dbm: 200,
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (prevProps.geoJson !== this.props.geoJson) {
      const features = [...this.props.geoJson.features];
      this.setCoverageAreaBounds(features);
    }
  }

  setCoverageAreaBounds(features) {
    let minus65DbmDistance = this.state.distanceMinus65Dbm;
    let minus65DbmPositions = getCoverageAreaBoundsForFeatures(
      features,
      minus65DbmDistance
    );

    let minus80DbmDistance = this.state.distanceMinus80Dbm;
    let minus80DbmPositions = getCoverageAreaBoundsForFeatures(
      features,
      minus80DbmDistance
    );

    let minus100DbmDistance = this.state.distanceMinus100Dbm;
    let minus100DbmPositions = getCoverageAreaBoundsForFeatures(
      features,
      minus100DbmDistance
    );

    this.setState({
      boundsMinus65Dbm: [...minus65DbmPositions],
      boundsMinus80Dbm: [...minus80DbmPositions],
      boundsMinus100Dbm: [...minus100DbmPositions],
    });
  }

  render() {
    const polygonGraphicsMinus65Dbm = this.state.boundsMinus65Dbm.map(
      (coverageArea, index) => {
        return (
          <Entity key={index} name={'-65 DBm'}>
            <PolygonGraphics
              zIndex={3}
              hierarchy={coverageArea}
              material={Color.fromCssColorString('#70be2d').withAlpha(0.7)}
            />
          </Entity>
        );
      }
    );

    const polygonGraphicsMinus80Dbm = this.state.boundsMinus80Dbm.map(
      (coverageArea, index) => {
        return (
          <Entity key={index} name={'-80 DBm'} onDoubleClick={null}>
            <PolygonGraphics
              zIndex={2}
              hierarchy={coverageArea}
              material={Color.fromCssColorString('#ffe300').withAlpha(0.5)}
            />
          </Entity>
        );
      }
    );

    const polygonGraphicsMinus100Dbm = this.state.boundsMinus100Dbm.map(
      (coverageArea, index) => {
        return (
          <Entity key={index} name={'-100 DBm'}>
            <PolygonGraphics
              zIndex={1}
              hierarchy={coverageArea}
              material={Color.fromCssColorString('#ff380f').withAlpha(0.4)}
            />
          </Entity>
        );
      }
    );

    return [
      polygonGraphicsMinus65Dbm,
      polygonGraphicsMinus80Dbm,
      polygonGraphicsMinus100Dbm,
    ];
  }
}

const mapStateToProps = (state) => {
  return {
    geoJson: state.geoJson,
  };
};

export default connect(mapStateToProps, null)(CoverageArea);
