/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { resetKmlData } from '../../store/kmlSlice';
import { resetMarkerData } from '../../store/markerSlice';
import {
  saveAsGeojson,
  createGeojsonFromFeaturesAndDistances,
} from '../../services/saveAsGeojson';
import './CurrentData.css';
import { AiFillDelete } from 'react-icons/ai';
import { FaFileExport } from 'react-icons/fa';

function CurrentData(props) {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (
      props.kmlFeatures.length !== 0 ||
      props.additionalMarkers.distances.length !== 0
    ) {
      setIsShown(true);
    } else {
      setIsShown(false);
    }
  }, [props]);

  const deleteKml = () => {
    if (window.confirm('Are you sure you wish to delete this file?')) {
      props.resetKmlData();
    }
  };

  const deleteAllMarkers = () => {
    if (
      window.confirm('Are you sure you wish to delete all additional markers?')
    ) {
      props.resetMarkerData();
    }
  };

  const saveData = () => {
    const features = [
      ...props.kmlFeatures,
      ...props.additionalMarkers.geoJson.features,
    ];

    const distances = [
      ...props.kmlDistances,
      ...props.additionalMarkers.distances,
    ];
    const geojson = createGeojsonFromFeaturesAndDistances(features, distances);
    saveAsGeojson(geojson, 'cellularapp.geojson');
  };

  if (!isShown) {
    return null;
  }

  return (
    <div className="current-data-container">
      {props.additionalMarkers.distances.length !== 0 && (
        <div className="current-data-item">
          {'Additional Markers'}
          <AiFillDelete
            className="current-data-delete"
            onClick={deleteAllMarkers}
          />
        </div>
      )}
      {props.kmlFeatures.length !== 0 && (
        <div className="current-data-item">
          {props.kmlFile.originalname}
          <AiFillDelete className="current-data-delete" onClick={deleteKml} />
        </div>
      )}

      <button onClick={saveData} className="current-data-export">
        Export Data
        <FaFileExport className="current-data-export__icon" />
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    kmlFeatures: state.kmlData.geoJson.features,
    kmlFile: state.kmlData.file,
    kmlDistances: state.kmlData.distances,
    additionalMarkers: state.markers,
  };
};

const mapDispatchToProps = {
  resetKmlData,
  resetMarkerData,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentData);
