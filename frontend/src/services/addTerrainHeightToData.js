import {
  Cartographic,
  Math as CesiumMath,
  sampleTerrainMostDetailed,
} from 'cesium';
import { terrainProvider } from '../components/Map';

const getRadianCoordsArrayFromFeatures = (features) => {
  let radianCoordsArray = [];
  for (const feature of features) {
    let coords = feature.geometry.coordinates;
    let longitude = CesiumMath.toRadians(coords[0]);
    let latitude = CesiumMath.toRadians(coords[1]);
    let height = coords[2];
    let position = new Cartographic(longitude, latitude, height);
    radianCoordsArray.push(position);
  }
  return radianCoordsArray;
};

const updateFeaturesDegreesFromRadians = (features, newPositions) => {
  features.map((feature, index) => {
    feature.geometry.coordinates[0] = CesiumMath.toDegrees(
      newPositions[index].longitude
    );
    feature.geometry.coordinates[1] = CesiumMath.toDegrees(
      newPositions[index].latitude
    );
    feature.geometry.coordinates[2] = newPositions[index].height;
  });
  return features;
};

export const addTerrainHeightToData = async (features) => {
  const radianCoordsArray = getRadianCoordsArrayFromFeatures(features);
  const newPositionsInRadian = await sampleTerrainMostDetailed(
    terrainProvider,
    radianCoordsArray
  );
  const updatedFeatures = updateFeaturesDegreesFromRadians(
    features,
    newPositionsInRadian
  );

  return updatedFeatures;
};
