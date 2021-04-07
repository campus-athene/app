import { createSlice } from '@reduxjs/toolkit';
import { session } from '../../api';
import { dispatchInstructions } from '../../redux/instructions';
import { selectSyncState as selectGlobalSyncState } from '../../redux/sync';
import { selectCreds } from '../auth/authSlice';

const offersSlice = createSlice({
  name: 'offers',
  initialState: { lists: [], hasLoaded: false, error: null },
  reducers: {
    reset(state, { payload }) {
      state.lists = payload;
      state.hasLoaded = true;
      state.error = null;
    },
    setError(state, { payload }) {
      state.error = payload;
    },
  },
});

export const { reset, setError } = offersSlice.actions;

export const getOffers = () => async (dispatch, getState) => {
  const creds = selectCreds()(getState(), dispatch);
  try {
    const offers = await new session(creds).getCourseOffers();
    dispatch(reset(offers));
  } catch (error) {
    dispatch(setError(String(error)));
    console.error(error);
  }
};

export const register = (registration) => async (dispatch, getState) => {
  const state = getState();
  try {
    const body = await new session(state.auth.creds).registerCourse(
      registration
    );
    dispatchInstructions(dispatch, body.instructions);
    return null;
  } catch (error) {
    console.log(`Register failed with '${JSON.stringify(error)}'.`);
    // Error is a string with a user friendly error message.
    return error;
  }
};

export const selectSyncState = () => (state) => {
  const { hasLoaded, error } = state.offers;
  const { isOffline } = selectGlobalSyncState()(state);
  return {
    isLoading: !hasLoaded && !error && !isOffline,
    isOffline: !!error || isOffline,
  };
};

export const selectLists = ({ offers }) => offers.lists;
export const selectOffer = (listId, moduleId) => ({ offers }) =>
  offers.lists
    .find((l) => l.id === listId)
    ?.modules.find((m) => m.id === moduleId);

export default offersSlice.reducer;
