import { session } from "../../api";
import { dispatchInstructions } from "../../redux/instructions";

export const reset = (exams) => (dispatch) => {
  dispatch({
    type: 'EXAMS_RESET',
    exams: exams
  });
  localStorage.setItem('exams', JSON.stringify(exams));
}

const exams = (state = JSON.parse(localStorage.getItem('exams')), action) => {
  switch (action.type) {
    case 'EXAMS_RESET':
      return action.exams;
    default:
      return state;
  }
}

export const registerExam = (id, semester, type) => async (dispatch, getState) => {
  try {
    const response = await new session(getState().auth.creds).registerExam(id, semester, type);
    dispatchInstructions(dispatch, response.instructions);
    return response.success ? null : (response.message || "Ein unbekannter Fehler ist aufgetreten.");
  }
  catch { return "Ein unbekannter Fehler ist aufgetreten." }
}

export default exams;
