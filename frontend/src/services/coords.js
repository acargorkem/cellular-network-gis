import { sampleTerrainMostDetailed, Math as CesiumMath } from 'cesium';
import { terrainProvider } from '../components/Map';

export const getCartesian3FromScreen = (viewer, position) => {
  const scene = viewer.scene;
  if (!scene) return;
  const ellipsoid = scene.globe.ellipsoid;
  const cartesian3 = scene.camera.pickEllipsoid(position, ellipsoid);
  return cartesian3;
};

export const getCartopgraphicFromCartesian3 = (viewer, cartesian) => {
  const scene = viewer.scene;
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
