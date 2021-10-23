import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import MapApi from '../api/MapApi';
import { addTerrainHeightToData } from '../services/addTerrainHeightToData';

const initialState = {
  geoJson: null,
  file: null,
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
  },
  extraReducers: {
    [fetchGeojsonFromApi.fulfilled]: (state, action) => {
      state.geoJson = action.payload.geoJson;
      state.file = action.payload.file;
      state.loading = false;
    },
    [fetchGeojsonFromApi.pending]: (state) => {
      state.loading = true;
    },
  },
});
