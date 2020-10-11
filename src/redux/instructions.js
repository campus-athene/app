import { updateCreds, logout } from "../features/auth/state";
import { update as updateMessages } from "../features/messages/state";
import { reset as resetCourseOffers } from "../features/courses/offersState";
import { reset as resetExams } from "../features/exams/examsSlice";

export const dispatchInstructions = (dispatch, instructions) =>
  Object.keys(instructions || {}).forEach(key => {
    try {
      instructions[key] && handlers[key](dispatch, instructions[key])
    }
    catch (e) { console.error(e); }
  }
  );

const handlers = {
  updateCreds: (dispatch, { creds }) => {
    dispatch(updateCreds(creds));
  },
  logout: (dispatch) => {
    dispatch(logout);
  },
  updateMessages: (dispatch, { messages }) => {
    dispatch(updateMessages(messages));
  },
  updateCourseOffers: (dispatch, { offers }) => {
    dispatch(resetCourseOffers(offers));
  },
  updateExams: (dispatch, { exams }) => {
    dispatch(resetExams(exams));
  }
}
