import { sampleTerrainMostDetailed, Math as CesiumMath } from 'cesium';
import { terrainProvider } from '../components/Map';

export const getCartesian3FromScreen = (scene, position) => {
  if (!scene) return;
  var pickRay = scene.camera.getPickRay(position);
  var pickedPosition = scene.globe.pick(pickRay, scene);
  return pickedPosition;
};

export const getCartopgraphicFromCartesian3 = (scene, cartesian) => {
  if (!scene) return;
  const ellipsoid = scene.globe.ellipsoid;
  return ellipsoid.cartesianArrayToCartographicArray([cartesian]);
};

export const addTerrainHeightToCartographic = async (cartographic) => {
  await sampleTerrainMostDetailed(terrainProvider, cartographic);

  return radianToDegree(cartographic);
};

export const radianToDegree = (cartographic) => {
  const latitude = CesiumMath.toDegrees(cartographic[0].latitude);
  const longitude = CesiumMath.toDegrees(cartographic[0].longitude);
  const height = cartographic[0].height;
  return [longitude, latitude, height];
};
