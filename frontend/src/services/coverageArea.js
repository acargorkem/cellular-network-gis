import { Math as CesiumMath, Cartesian3 } from 'cesium';

const radiusOfEarthInMeters = 6371008.7714;

/**
 * Algorithm for calculate the boundary points of a hexagon
 *  @param lonRadian Longitude in radian
 *  @param latRadian Latitude in radian
 *  @param height Height in meters
 *  @param radius Radius in meters
 **/
const getHexagonBoundsInCartesian3 = (lonRadian, latRadian, height, radius) => {
  const bounds = [];
  const step = 60;
  for (let i = 0; i < 360; i += step) {
    const radians = CesiumMath.toRadians(i);
    const d = radius / radiusOfEarthInMeters;
    const { newLongitudeInRadian, newLatitudeInRadian } = getDestinationPoint(
      latRadian,
      lonRadian,
      d,
      radians
    );

    const position = Cartesian3.fromRadians(
      newLongitudeInRadian,
      newLatitudeInRadian,
      height
    );
    bounds.push(position);
  }
  return bounds;
};

/**
 * Algorithm for calculating the new point at a certain distance
 * and at a certain angle from a central point
 * @param latRadian Latitude in radian
 * @param lonRadian Longitude in radian
 * @param d Angular distance, yourRadius / radiusOfEarthInMeters
 * @param bearing Bearing in radian
 **/
const getDestinationPoint = (latRadian, lonRadian, d, bearing) => {
  const newLatitudeInRadian = Math.asin(
    Math.sin(latRadian) * Math.cos(d) +
      Math.cos(latRadian) * Math.sin(d) * Math.cos(bearing)
  );
  const newLongitudeInRadian =
    lonRadian +
    Math.atan2(
      Math.sin(bearing) * Math.sin(d) * Math.cos(latRadian),
      Math.cos(d) - Math.sin(latRadian) * Math.sin(newLatitudeInRadian)
    );
  return { newLongitudeInRadian, newLatitudeInRadian };
};

/**
 * Algorithm for calculate the endpoints of a triangle from a center point
 * This triangle will later be used as the center points of the hexagons.
 * @param lonDegree Longitude in degree
 * @param latDegree Latitude in degree
 * @param height Height in meters
 * @param bearing Bearing in radian
 * @param radius Radius in meters
 **/
const getCenterForSingleSector = (
  lonDegree,
  latDegree,
  height,
  bearing,
  radius
) => {
  const latRadian = CesiumMath.toRadians(latDegree);
  const lonRadian = CesiumMath.toRadians(lonDegree);

  const radian = CesiumMath.toRadians(bearing);
  const d = radius / radiusOfEarthInMeters;
  const { newLongitudeInRadian, newLatitudeInRadian } = getDestinationPoint(
    latRadian,
    lonRadian,
    d,
    radian
  );

  let position = [newLongitudeInRadian, newLatitudeInRadian, height];

  return position;
};

// iterate all features for get all hexagonal polygon bounds
export const getCoverageAreaBoundsForFeatures = (features, distances) => {
  const bounds = [];

  features.forEach((feature, index) => {
    const distance = distances[index];
    const lon = feature.geometry.coordinates[0];
    const lat = feature.geometry.coordinates[1];
    const height = feature.geometry.coordinates[2];

    const threeSector = [
      {
        bearing: 0, // top
        distance: distance.top / 2,
      },
      {
        bearing: 120, // right
        distance: distance.right / 2,
      },
      {
        bearing: 240, // left
        distance: distance.left / 2,
      },
    ];
    const centers = threeSector.map((sector) => {
      const center = getCenterForSingleSector(
        lon,
        lat,
        height,
        sector.bearing,
        sector.distance
      );
      return [...center, sector.distance];
    });

    centers.map((center) => {
      const bound = getHexagonBoundsInCartesian3(
        center[0],
        center[1],
        center[2],
        center[3]
      );
      bounds.push(bound);
    });
  });
  return bounds;
};
