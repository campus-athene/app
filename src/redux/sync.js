import { createSlice } from "@reduxjs/toolkit";
import { session } from "../api";
import { dispatchInstructions } from "./instructions";
import { NetworkError, ServerError } from "../api/errors";
import { selectCreds } from "../features/auth/authSlice";
import { getOffers } from "../features/courses/offersSlice";

// Update used in useEffect must not be async.
export const update = () => (dispatch) => {
  dispatch(updateAsync());
}

const updateAsync = () => async (dispatch, getState) => {
  const creds = selectCreds()(getState(), dispatch);

  if (!creds)
    return;

  dispatch(setLoading());

  try {
    const response = await new session(creds).sync();
    dispatch(setLoaded(response.result));
    dispatchInstructions(dispatch, response.instructions);
    dispatch(getOffers());
  }
  catch (err) {
    if (err instanceof NetworkError)
      dispatch(setOffline());
    else
      dispatch(setError(
        err instanceof ServerError ?
          err.message || "Technischer Fehler beim aktualisieren." :
          String(err)
      ));
  }
}

// isLoading and isOffline are only for downwards compatibility and deprecated.
const syncSlice = createSlice({
  name: 'sync',
  initialState: { type: 'INITIALIZED', isLoading: true, isOffline: false },
  reducers: {
    setLoading: (state) => ({ type: 'LOADING', isLoading: true, isOffline: false }),
    setLoaded: (state) => ({ type: 'LOADED', isLoading: false, isOffline: false }),
    setOffline: (state) => ({ type: 'OFFLINE', isLoading: false, isOffline: true }),
    setError: (state, action) => ({
      type: 'ERROR',
      isLoading: false, isOffline: false,
      error: action.payload,
    }),
  }
});

export const { setLoading, setLoaded, setOffline, setError } = syncSlice.actions;

export const selectIsLoaded = ({ sync }) => sync.type !== 'LOADING' && sync.type !== 'INITIALIZED';
export const selectIsOffline = ({ sync }) => sync.type === 'OFFLINE';
export const selectErrorMessage = ({ sync }) => sync.error || null;

export default syncSlice.reducer;
