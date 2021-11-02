import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addTerrainHeightToCartographic } from '../services/coords';

const initialGeoJson = {
  type: 'FeatureCollection',
  features: [],
};

const initialState = {
  geoJson: initialGeoJson,
  distances: [],
  isLoading: false,
};

const createFeature = (name, coords) => {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: coords,
    },
    properties: {
      name: name,
    },
  };
};

export const addMarker = createAsyncThunk(
  'markers/addMarker',
  async (data, { rejectWithValue }) => {
    try {
      const { coords, name } = data;
      const coordsWithHeight = await addTerrainHeightToCartographic(coords);
      return { coordsWithHeight, name };
    } catch (error) {
      return rejectWithValue('An error occured');
    }
  }
);

export const addMarkerSlice = createSlice({
  name: 'markers',
  initialState,
  reducers: {},
  extraReducers: {
    [addMarker.fulfilled]: (state, { payload }) => {
      const feature = createFeature(payload.name, payload.coordsWithHeight);

      state.geoJson.features.push(feature);
      state.distances.push(500);
      state.isLoading = false;
    },
    [addMarker.pending]: (state) => {
      state.isLoading = true;
    },
    [addMarker.rejected]: (state, { payload }) => {
      alert(payload.errorMessage);
      state.isLoading = false;
    },
  },
});
