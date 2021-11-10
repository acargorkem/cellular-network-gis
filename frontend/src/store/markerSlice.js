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
      const { coords, name, distance } = data;
      const coordsWithHeight = await addTerrainHeightToCartographic(coords);
      return { coordsWithHeight, name, distance };
    } catch (error) {
      return rejectWithValue('An error occured');
    }
  }
);

export const markerSlice = createSlice({
  name: 'markers',
  initialState,
  reducers: {
    setDistance: (state, { payload }) => {
      state.distances[payload.index] = payload.value;
    },
    setPropertyName: (state, { payload }) => {
      let { index, name } = payload;
      let properties = state.geoJson.features[index].properties;
      if (!properties) {
        properties = {};
      }
      properties.name = name;
    },
  },
  extraReducers: {
    [addMarker.fulfilled]: (state, { payload }) => {
      const feature = createFeature(payload.name, payload.coordsWithHeight);

      state.geoJson.features.push(feature);
      state.distances.push(payload.distance);
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

const { actions, reducer } = markerSlice;

export const { setDistance, setPropertyName } = actions;

export default reducer;
