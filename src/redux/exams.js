import { session } from "../api";
import { dispatchInstructions } from "./instructions";

export const reset = (exams) => (dispatch) => {
  dispatch({
    type: 'EXAMS_RESET',
    exams: exams
  });
  localStorage.setItem('exams', JSON.stringify(exams));
}

export const loadExams = () => (dispatch, getState) => {
  new session(getState().auth.creds).getExams()
    .then(result => {
      dispatchInstructions(dispatch, result.instructions);
      dispatch(reset(result.result));
    });
}

const exams = (state = JSON.parse(localStorage.getItem('exams')), action) => {
  switch (action.type) {
    case 'EXAMS_RESET':
      return action.exams;
    default:
      return state;
  }
}

export default exams;
