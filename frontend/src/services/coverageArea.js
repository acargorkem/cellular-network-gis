import { Math as CesiumMath, Cartesian3 } from 'cesium';

const radiusOfEarthInMeters = 6371008.7714;

const getCoverageAreaCenterPoints = (lonDegree, latDegree, height, radius) => {
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
};

const getHexagonBoundsInCartesian3 = (lonRadian, latRadian, height, radius) => {
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
};

export const getCoverageAreaBoundsForFeatures = (features, distances) => {
  let positions = [];
  features.forEach((feature, index) => {
    let distance = distances[index] / 2;
    const lon = feature.geometry.coordinates[0];
    const lat = feature.geometry.coordinates[1];
    const height = feature.geometry.coordinates[2];
    let coverageAreaCenterPoints = getCoverageAreaCenterPoints(
      lon,
      lat,
      height,
      distance
    );

    coverageAreaCenterPoints.forEach((point) => {
      let position = getHexagonBoundsInCartesian3(
        point[0],
        point[1],
        point[2],
        distance
      );
      positions.push(position);
    });
  });
  return positions;
};
