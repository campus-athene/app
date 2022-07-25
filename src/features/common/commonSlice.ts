import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux';

const commonSlice = createSlice({
  name: 'common',
  initialState: {
    sideMenuOpen: false,
    statusBarHeight: null as number | null,
  },
  reducers: {
    setSideMenuOpen: (state, { payload }) => {
      state.sideMenuOpen = payload;
    },
    setStatusBarHeight: (state, { payload }) => {
      state.statusBarHeight = payload;
    },
    toggleSideMenu: (state) => {
      state.sideMenuOpen = !state.sideMenuOpen;
    },
  },
});

export const { setSideMenuOpen, setStatusBarHeight, toggleSideMenu } =
  commonSlice.actions;

export const selectStatusBarHeightCss =
  () =>
  ({ common: { statusBarHeight } }: RootState) =>
    typeof statusBarHeight === 'number'
      ? `${statusBarHeight}px`
      : 'env(safe-area-inset-top)';

export const selectSideMenuOpen =
  () =>
  ({ common: { sideMenuOpen } }: RootState) =>
    sideMenuOpen;

export default commonSlice.reducer;
