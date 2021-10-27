import { Math as CesiumMath, Cartographic } from 'cesium';

const cartographicToCartesian = (cartographicCoords) => {
  const longitude = CesiumMath.toRadians(cartographicCoords[0]);
  const latitude = CesiumMath.toRadians(cartographicCoords[1]);
  const height = cartographicCoords[2];

  const cartographic = new Cartographic(longitude, latitude, height);
  const cartesian = Cartographic.toCartesian(cartographic);
  return cartesian;
};

export const cameraFlyToDestination = (camera, cartographicDestination) => {
  cartographicDestination[2] += 15000.0;
  const destination = cartographicToCartesian(cartographicDestination);
  camera.flyTo({
    destination: destination,
    duration: 3,
  });
};
