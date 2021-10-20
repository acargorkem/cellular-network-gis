import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import MapApi from '../api/MapApi';
import { addTerrainHeightToData } from '../services/addTerrainHeightToData';

const initialState = {
  geoJson: null,
  file: null,
  loading: false,
};

export const fetchGeojsonFromApi = createAsyncThunk(
  'geospatial/fetchGeoSpatial',
  async (data) => {
    const response = await MapApi.uploadKmlFile(data);
    await addTerrainHeightToData(response.data.geoJson.features); // mutating response data

    return response.data;
  }
);

export const geoSpatialSlice = createSlice({
  name: 'geospatial',
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
