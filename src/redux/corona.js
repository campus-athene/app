export const reset = (state) => (dispatch) => {
  localStorage.setItem('corona', JSON.stringify(state));
  dispatch({
    type: 'CORONA_RESET',
    state
  })
};

export default (state = localStorage.getItem('corona') || [], action) => {
  switch (action.type) {
    case 'CORONA_RESET':
      return action.state;
    default:
      return state;
  }
}
