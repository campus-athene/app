import { log } from '../errorReporting';
import { updateCreds, logout } from '../features/auth/authSlice';
import { reset as resetMessages } from '../features/messages/messagesSlice';
import { reset as resetCourses } from '../features/courses/coursesSlice';
import { reset as resetOffers } from '../features/courses/offersSlice';
import { reset as resetExams } from '../features/exams/examsSlice';

export const dispatchInstructions = (dispatch, instructions) =>
  Object.keys(instructions || {}).forEach((key) => {
    try {
      handlers[key] && handlers[key](dispatch, instructions[key]);
    } catch (e) {
      log('warning', 'Error handling instructions.', e);
    }
  });

const handlers = {
  updateCreds: (dispatch, { creds }) => {
    dispatch(updateCreds({ creds }));
  },
  logout: (dispatch) => {
    dispatch(logout());
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
