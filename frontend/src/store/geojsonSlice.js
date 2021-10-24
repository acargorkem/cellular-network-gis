import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import MapApi from '../api/MapApi';
import { addTerrainHeightToData } from '../services/addTerrainHeightToData';

const initialState = {
  geoJson: null,
  file: null,
  distances: [],
  loading: false,
};

export const fetchGeojsonFromApi = createAsyncThunk(
  'geoJson/fetchgeoJson',
  async (data) => {
    // TODO: HANDLE ERRORS
    // TODO: LOADING COMPONENT
    const response = await MapApi.uploadKmlFile(data);
    await addTerrainHeightToData(response.data.geoJson.features); // mutating response data
    return response.data;
  }
);

export const geojsonSlice = createSlice({
  name: 'geoJson',
  initialState,
  reducers: {
    fetchGeojson: (state, { payload }) => {
      state.geoJson = payload;
    },
    setDistance: (state, { payload }) => {
      state.distances[payload.index] = payload.value;
    },
  },
  extraReducers: {
    [fetchGeojsonFromApi.fulfilled]: (state, { payload }) => {
      state.geoJson = payload.geoJson;
      state.file = payload.file;
      state.distances = new Array(payload.geoJson.features.length).fill(500);
      state.loading = false;
    },
    [fetchGeojsonFromApi.pending]: (state) => {
      state.loading = true;
    },
  },
});
