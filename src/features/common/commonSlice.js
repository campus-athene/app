import { createSlice } from '@reduxjs/toolkit';

const commonSlice = createSlice({
  name: 'common',
  initialState: {},
  reducers: {
    setSideMenuOpen: (state, { payload }) => {
      state.sideMenuOpen = payload;
    },
    setStatusBarHeight: (state, { payload }) => {
      state.statusBarHeight = payload;
    },
    toggleSideMenu: (state) => {
      state.statusBarHeight = !state.statusBarHeight;
    },
  },
});

export const { setSideMenuOpen, setStatusBarHeight, toggleSideMenu } =
  commonSlice.actions;

export const selectStatusBarHeightCss =
  () =>
  ({ common: { statusBarHeight } }) =>
    typeof statusBarHeight === 'number'
      ? `${statusBarHeight}px`
      : 'env(safe-area-inset-top)';

export const selectSideMenuOpen =
  () =>
  ({ common: { sideMenuOpen } }) =>
    sideMenuOpen;

export default commonSlice.reducer;
