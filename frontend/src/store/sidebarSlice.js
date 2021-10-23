import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarShown: true,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    sidebarToggle: (state) => {
      state.isSidebarShown = !state.isSidebarShown;
    },
  },
});
