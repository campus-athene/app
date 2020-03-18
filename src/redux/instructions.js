import { updateCreds, logout } from "./auth";
import { reset as resetCourseOffers } from "./courseOffers";
import { reset as resetExams } from "./exams";

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
  updateCourseOffers: (dispatch, { offers }) => {
    dispatch(resetCourseOffers(offers));
  },
  updateExams: (dispatch, { exams }) => {
    dispatch(resetExams(exams));
  }
}
