import { updateCreds, logout } from '../features/auth/authSlice';
import { reset as resetMessages } from '../features/messages/messagesSlice';
import { reset as resetCourses } from '../features/courses/coursesSlice';
import { reset as resetOffers } from '../features/courses/offersSlice';
import { reset as resetExams } from '../features/exams/examsSlice';

export const dispatchInstructions = (dispatch, instructions) =>
  Object.keys(instructions || {}).forEach((key) => {
    try {
      instructions[key] && handlers[key](dispatch, instructions[key]);
    } catch (e) {
      console.error(e);
    }
  });

const handlers = {
  updateCreds: (dispatch, { creds }) => {
    dispatch(updateCreds({ creds }));
  },
  logout: (dispatch) => {
    dispatch(logout);
  },
  updateMessages: (dispatch, { messages }) => {
    dispatch(resetMessages({ messages }));
  },
  updateCourses: (dispatch, { courses }) => {
    dispatch(resetCourses({ courses }));
  },
  updateCourseOffers: (dispatch, { offers }) => {
    dispatch(resetOffers(offers));
  },
  updateExams: (dispatch, { exams }) => {
    dispatch(resetExams(exams));
  },
};
