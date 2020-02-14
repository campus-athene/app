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

  return new Promise(resolve => setTimeout(resolve, 1500))
    .then(result => {
      dispatch(processingSucceeded({ username, password }));
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
