import { session } from "../api";
import { dispatchInstructions } from "./instructions";

export const processingStarted = () => ({
  type: 'PROCESSING_STARTED'
});

export const processingSucceeded = () => ({
  type: 'PROCESSING_SUCCEEDED'
});

export const processingFailed = (error) => ({
  type: 'PROCESSING_FAILED',
  error
});

export const login = (username, password) => dispatch => {
  if (!username || !password) {
    dispatch(processingFailed("Bitte vervollständige deine Eingaben."));
    return;
  }

  dispatch(processingStarted());

  return session.login(username, password)
    .then(result => {
      dispatch(processingSucceeded());
      dispatchInstructions(dispatch, result.instructions);
    })
    .catch(error => {
      dispatch(processingFailed(error));
      dispatchInstructions(dispatch, error.instructions);
    });
};

export const updateCreds = (creds) => dispatch => {
  dispatch({
    type: 'UPDATE_CREDS',
    creds
  });
  localStorage.setItem('creds', JSON.stringify(creds));
}

export const logout = () => dispatch => {
  dispatch(({
    type: 'LOGOUT'
  }));
  localStorage.setItem('creds', null);
};

export default (state = { creds: JSON.parse(localStorage.getItem('creds')) }, action) => {
  switch (action.type) {
    case 'PROCESSING_STARTED':
      return Object.assign({}, state, {
        processing: true,
        error: null
      });
    case 'PROCESSING_SUCCEEDED':
      return Object.assign({}, state, {
        processing: false,
        error: null
      });
    case 'PROCESSING_FAILED':
      return Object.assign({}, state, {
        processing: false,
        error: action.error
      })
    case 'UPDATE_CREDS':
      return Object.assign({}, state, {
        creds: action.creds
      })
    case 'LOGOUT':
      return Object.assign({}, state, {
        creds: null
      })
    default:
      return state;
  }
};
