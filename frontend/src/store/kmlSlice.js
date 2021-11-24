import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import MapApi from '../api/MapApi';
import { addTerrainHeightToData } from '../services/addTerrainHeightToData';

const initialGeoJson = {
  type: 'FeatureCollection',
  features: [],
};

const initialState = {
  geoJson: initialGeoJson,
  file: null,
  distances: [],
  isLoading: false,
  firstCoords: null,
};

const initialDistances = {
  top: 500,
  left: 500,
  right: 500,
};

export const fetchGeojsonFromApi = createAsyncThunk(
  'geoJson/fetchgeoJson',
  async (data, { rejectWithValue }) => {
    try {
      const response = await MapApi.uploadKmlFile(data);
      await addTerrainHeightToData(response.data.geoJson.features); // mutating response data
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const kmlSlice = createSlice({
  name: 'geoJson',
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
    deleteFeature: (state, { payload }) => {
      let { index } = payload;
      let features = state.geoJson.features;
      let distances = state.distances;
      features.splice(index, 1);
      distances.splice(index, 1);
    },
  },
  extraReducers: {
    [fetchGeojsonFromApi.fulfilled]: (state, { payload }) => {
      state.geoJson = payload.geoJson;
      state.firstCoords = payload.geoJson.features[0].geometry.coordinates;
      state.file = payload.file;
      state.distances = [];
      state.distances = new Array(payload.geoJson.features.length).fill(
        initialDistances
      );
      state.isLoading = false;
    },
    [fetchGeojsonFromApi.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchGeojsonFromApi.rejected]: (state, { payload }) => {
      state.isLoading = false;
      if (!payload) {
        return alert('An unexpected error occurred');
      }
      return alert(payload.errorMessage || 'An unexpected error occurred');
    },
  },
});

const { actions, reducer } = kmlSlice;

export const { setDistance, setPropertyName, deleteFeature } = actions;

export default reducer;
