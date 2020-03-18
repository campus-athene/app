export const update = () => async (dispatch) => {
  try {
    const response = await fetch('https://campus-pwa.s3.eu-central-1.amazonaws.com/corona.html');
    const html = await response.text();

    dispatch(setHtml(html));
    localStorage.setItem('corona', JSON.stringify({ html }));
  }
  catch (err) {
    dispatch(setError());
  }
}

const setHtml = (html) => ({
  type: 'CORONA_SETHTML',
  html
});

const setError = (error = true) => ({
  type: 'CORONA_SETERROR',
  error
});

// Todo: Load state from storage
// const defaultState = () => {
//   const state = JSON.parse(localStorage.getItem('corona'));
//   return { loading: true, html: state.html };
// }

export default (state = { loading: true } || [], action) => {
  switch (action.type) {
    case 'CORONA_SETHTML':
      return {
        html: action.html
      };
    case 'CORONA_SETERROR':
      return {
        error: action.error
      };
    default:
      return state;
  }
}
