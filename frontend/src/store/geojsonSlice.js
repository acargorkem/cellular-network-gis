import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import MapApi from '../api/MapApi';
import { addTerrainHeightToData } from '../services/addTerrainHeightToData';

const initialState = {
  geoJson: null,
  file: null,
  distances: [],
  isLoading: false,
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
      state.isLoading = false;
    },
    [fetchGeojsonFromApi.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchGeojsonFromApi.rejected]: (state, { payload }) => {
      alert(payload.errorMessage);
      state.isLoading = false;
    },
  },
});
