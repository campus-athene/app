import { updateCreds, logout } from "./auth";
import { reset } from "./exams";

export const dispatchInstructions = (dispatch, instructions) =>
  Object.keys(instructions || {}).forEach(key => 
    instructions[key] && handlers[key](dispatch, instructions[key])
  );

const handlers = {
  updateCreds: (dispatch, { creds }) => {
    dispatch(updateCreds(creds));
  },
  logout: (dispatch) => {
    dispatch(logout);
  },
  updateExams: (dispatch, { exams }) => {
    dispatch(reset(exams));
  }
}
