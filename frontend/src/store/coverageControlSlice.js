import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  opacity: 0.5,
};

export const coverageControl = createSlice({
  name: 'coverageControl',
  initialState,
  reducers: {
    setOpacity: (state, { payload }) => {
      state.opacity = payload / 100;
    },
  },
});

const { actions, reducer } = coverageControl;

export const { setOpacity } = actions;

export default reducer;
