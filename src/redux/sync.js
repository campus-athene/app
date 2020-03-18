import { session } from "../api";
import { dispatchInstructions } from "./instructions";
import { NetworkError, ServerError } from "../api/errors";
import { update as updateCorona } from "./corona";

// Update used in useEffect must not be async.
export const update = () => (dispatch) => {
  dispatch(updateAsync());
  dispatch(updateCorona());
}

const updateAsync = () => async (dispatch, getState) => {
  const state = getState();

  if (!state.auth.creds)
    return;

  dispatch(setLoading());

  try {
    const response = await new session(state.auth.creds).sync();
    dispatch(setSyncState(response.result));
    dispatchInstructions(dispatch, response.instructions);
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

const setSyncState = (state) => ({
  type: 'SYNC_SETSTATE',
  state
});

const setLoading = () => ({
  type: 'SYNC_LOADING'
});

const setOffline = () => ({
  type: 'SYNC_OFFLINE'
});

const setError = (message) => ({
  type: 'SYNC_ERROR',
  message
});

export default (state = { isLoading: true }, action) => {
  switch (action.type) {
    case 'SYNC_SETSTATE':
      return action.state;
    case 'SYNC_LOADING':
      return Object.assign({}, action.state, {
        isLoading: true,
        isOffline: false
      });
    case 'SYNC_OFFLINE':
      return Object.assign({}, action.state, {
        isLoading: false,
        isOffline: true
      });
    case 'SYNC_ERROR':
      return Object.assign({}, action.state, {
        isLoading: false,
        isOffline: false,
        error: action.messages
      });
    default:
      return state;
  }
}
