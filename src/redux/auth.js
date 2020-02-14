import { session } from "../api";

export const processingStarted = () => ({
  type: 'PROCESSING_STARTED'
});

export const processingSucceeded = (creds) => ({
  type: 'PROCESSING_SUCCEEDED',
  creds
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
    .then(creds => {
      dispatch(processingSucceeded(creds));
      localStorage.setItem('creds', JSON.stringify(creds));
    })
    .catch(error => {
      dispatch(processingFailed(error));
    });
};

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
        creds: action.creds,
        error: null
      });
    case 'PROCESSING_FAILED':
      return Object.assign({}, state, {
        processing: false,
        error: action.error
      })
    case 'LOGOUT':
      return Object.assign({}, state, {
        creds: null
      })
    default:
      return state;
  }
};
