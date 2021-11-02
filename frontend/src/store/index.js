import { configureStore } from '@reduxjs/toolkit';
import { geojsonSlice } from './geojsonSlice';
import { addMarkerSlice } from './addMarkerSlice';

export const store = configureStore({
  reducer: {
    coverageArea: geojsonSlice.reducer,
    markers: addMarkerSlice.reducer,
  },
});

export default store;
