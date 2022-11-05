import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    statusBarHeight: null as number | null,
  },
  reducers: {
    setStatusBarHeight: (state, { payload }) => {
      state.statusBarHeight = payload;
    },
  },
});

export const { setStatusBarHeight } = globalSlice.actions;

export const selectStatusBarHeightCss =
  () =>
  ({ [globalSlice.name]: { statusBarHeight } }: RootState) =>
    typeof statusBarHeight === 'number'
      ? `${statusBarHeight}px`
      : 'env(safe-area-inset-top)';

export default globalSlice.reducer;
