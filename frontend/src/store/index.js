import { configureStore } from '@reduxjs/toolkit';
import kmlSliceReducer from './kmlSlice';
import markerSliceReducer from './markerSlice';
import infoboxSliceReducer from './infoboxSlice';
import coverageControlReducer from './coverageControlSlice';

export const store = configureStore({
  reducer: {
    kmlData: kmlSliceReducer,
    markers: markerSliceReducer,
    infobox: infoboxSliceReducer,
    coverageControl: coverageControlReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
