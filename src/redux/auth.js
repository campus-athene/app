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
})

export const login = (username, password) => dispatch => {
  if (!username || !password) {
    dispatch(processingFailed("Bitte vervollständige deine Eingaben."));
    return;
  }

  dispatch(processingStarted());

  return session.login(username, password)
    .then(creds => {
      dispatch(processingSucceeded(creds));
    })
    .catch(error => {
      dispatch(processingFailed(error));
    });
};

export default (state = { }, action) => {
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
        error: null,
        loggedIn: true
      });
    case 'PROCESSING_FAILED':
      return Object.assign({}, state, {
        processing: false,
        error: action.error
      })
    default:
      return state;
  }
}
