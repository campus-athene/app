import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../redux';

type State = {
  canteenId: '1' | '2';
  additives: string[];
  allergies: string[];
  type: string[];
};

const loadFromDisk = (): State => {
  try {
    const stored = localStorage.getItem('cateenSettings');
    if (stored) return JSON.parse(stored);
  } catch (e) {}
  return {
    canteenId: '1',
    additives: [],
    allergies: [],
    type: [],
  };
};

const saveToDisk = (state: State): void => {
  localStorage.setItem('canteenSettings', JSON.stringify(state));
};

const canteenSettings = createSlice({
  name: 'canteenSettings',
  initialState: loadFromDisk(),
  reducers: {
    setCanteen(state, { payload }: { payload: '1' | '2' }) {
      state.canteenId = payload;
      saveToDisk(state);
    },
  },
});

export const { setCanteen } = canteenSettings.actions;

export const selectCanteen =
  () =>
  ({ canteenSettings }: RootState) =>
    canteenSettings.canteenId;

export default canteenSettings.reducer;
