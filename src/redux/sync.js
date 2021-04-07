import { createSlice } from '@reduxjs/toolkit';
import { session } from '../api';
import { dispatchInstructions } from './instructions';
import { NetworkError, ServerError } from '../api/errors';
import { selectCreds } from '../features/auth/authSlice';
import { getOffers } from '../features/courses/offersSlice';

// Update used in useEffect must not be async.
export const update = () => (dispatch) => {
  dispatch(updateAsync());
};

const updateAsync = () => async (dispatch, getState) => {
  const creds = selectCreds()(getState(), dispatch);

  if (!creds) return;

  dispatch(setLoading());

  try {
    const response = await new session(creds).sync();
    dispatch(setLoaded(response.result));
    dispatchInstructions(dispatch, response.instructions);
    dispatch(getOffers());
  } catch (err) {
    if (err instanceof NetworkError) dispatch(setOffline());
    else
      dispatch(
        setError(
          err instanceof ServerError
            ? err.message || 'Technischer Fehler beim aktualisieren.'
            : String(err)
        )
      );
  }
};

const syncSlice = createSlice({
  name: 'sync',
  initialState: { type: 'INITIALIZED' },
  reducers: {
    setLoading: () => ({ type: 'LOADING' }),
    setLoaded: () => ({ type: 'LOADED' }),
    setOffline: () => ({ type: 'OFFLINE' }),
    setError: (_state, action) => ({
      type: 'ERROR',
      error: action.payload,
    }),
  },
});

export const {
  setLoading,
  setLoaded,
  setOffline,
  setError,
} = syncSlice.actions;

export const selectSyncState = () => ({ sync: { type } }) => ({
  isLoading: type === 'INITIALIZED' || type === 'LOADING',
  isOffline: type === 'OFFLINE' || type === 'ERROR',
});

export default syncSlice.reducer;
