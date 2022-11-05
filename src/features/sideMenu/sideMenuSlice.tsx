import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux';

const sideMenuSlice = createSlice({
  name: 'sideMenu',
  initialState: {
    sideMenuOpen: false,
  },
  reducers: {
    setSideMenuOpen: (state, { payload }) => {
      state.sideMenuOpen = payload;
    },
    toggleSideMenu: (state) => {
      state.sideMenuOpen = !state.sideMenuOpen;
    },
  },
});

export const { setSideMenuOpen, toggleSideMenu } = sideMenuSlice.actions;

export const selectSideMenuOpen =
  () =>
  ({ [sideMenuSlice.name]: { sideMenuOpen } }: RootState) =>
    sideMenuOpen;

export default sideMenuSlice.reducer;
