import React from 'react';
import { connect } from 'react-redux';
import { GeoJsonDataSource } from 'resium';

class Visualization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataloaded: false,
    };
  }

  componentDidMount() {
    this.visualizeGeoJsonDataSource();
  }

  visualizeGeoJsonDataSource() {
    // TODO : implement cameraFly to visualized data
    this.setState({ isDataloaded: true });
  }

  render() {
    return <GeoJsonDataSource data={this.props.geospatialData.geoJson} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(Visualization);
