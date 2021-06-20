import { createSlice } from '@reduxjs/toolkit';

const commonSlice = createSlice({
  name: 'common',
  initialState: {},
  reducers: {
    setStatusBarHeight: (state, { payload }) => {
      state.statusBarHeight = payload;
    },
  },
});

export const { setStatusBarHeight } = commonSlice.actions;

export const selectStatusBarHeightCss =
  () =>
  ({ common: { statusBarHeight } }) =>
    typeof statusBarHeight === 'number'
      ? `${statusBarHeight}px`
      : 'env(safe-area-inset-top)';

export default commonSlice.reducer;
