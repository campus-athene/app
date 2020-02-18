import { session } from "../api";
import { dispatchInstructions } from "./instructions";

export const reset = (exams) => ({
  type: 'RESET',
  exams: exams
});

export const loadExams = () => (dispatch, getState) => {
  new session(getState().auth.creds).getExamsResults()
    .then(result => {
      dispatchInstructions(dispatch, result.instructions);
      dispatch(reset(result.content));
    });
}

const exams = (state = [], action) => {
  switch (action.type) {
    case 'RESET':
      return action.exams;
    default:
      return state;
  }
}

export default exams;
