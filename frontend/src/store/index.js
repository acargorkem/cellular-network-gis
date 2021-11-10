import { configureStore } from '@reduxjs/toolkit';
import geojsonSliceReducer from './geojsonSlice';
import markerSliceReducer from './markerSlice';
import infoboxSliceReducer from './infoboxSlice';

export const store = configureStore({
  reducer: {
    coverageArea: geojsonSliceReducer,
    markers: markerSliceReducer,
    infobox: infoboxSliceReducer,
  },
});

export default store;
