import { saveAs } from 'file-saver';

export const saveAsGeojson = (geojson, filename) => {
  const json = JSON.stringify(geojson);
  const file = new File([json], filename, {
    type: 'text/plain;charset=utf-8',
  });
  saveAs(file);
};

export const createGeojsonFromFeaturesAndDistances = (features, distances) => {
  const featuresWithDistances = features.map((feature, index) => {
    const newFeature = {
      ...feature,
      properties: { ...feature.properties, distances: distances[index] },
    };
    return newFeature;
  });
  const geoJson = {
    type: 'FeatureCollection',
    features: featuresWithDistances,
  };

  return geoJson;
};
