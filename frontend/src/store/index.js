import { configureStore } from '@reduxjs/toolkit';
import geojsonSliceReducer from './geojsonSlice';
import markerSliceReducer from './markerSlice';

export const store = configureStore({
  reducer: {
    coverageArea: geojsonSliceReducer,
    markers: markerSliceReducer,
  },
});

export default store;
