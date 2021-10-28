import { configureStore } from '@reduxjs/toolkit';
import { geojsonSlice } from './geojsonSlice';

export const store = configureStore({
  reducer: {
    coverageArea: geojsonSlice.reducer,
  },
});

export default store;
