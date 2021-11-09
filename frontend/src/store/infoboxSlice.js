import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'inactive',
  feature: {},
  featureIndex: null,
  coverageDistance: null,
};

export const infoboxSlice = createSlice({
  name: 'infobox',
  initialState,
  reducers: {
    setInfoboxStatus: (state, { payload }) => {
      state.status = payload;
    },
    setInfoboxContent: (state, { payload }) => {
      let { feature, index, distance } = payload;
      state.feature = feature;
      state.featureIndex = index;
      state.coverageDistance = distance;
    },
  },
});

const { actions, reducer } = infoboxSlice;

export const { setInfoboxStatus, setInfoboxContent } = actions;

export default reducer;
