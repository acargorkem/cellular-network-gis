import { configureStore } from '@reduxjs/toolkit';
import { geojsonSlice } from './geojsonSlice';
import { sidebarSlice } from './sidebarSlice';

export const store = configureStore({
  reducer: {
    coverageArea: geojsonSlice.reducer,
    sidebar: sidebarSlice.reducer,
  },
});

export default store;
