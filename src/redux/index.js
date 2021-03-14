import { combineReducers } from 'redux';
import auth from '../features/auth/authSlice';
import sync from './sync';
import messages from '../features/messages/messagesSlice';
import courses from '../features/courses/coursesSlice';
import offers from '../features/courses/offersSlice';
import exams from '../features/exams/examsSlice';

const appReducer = combineReducers({
  auth,
  sync,

  // data
  messages,
  courses,
  offers,
  exams,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    localStorage.clear();
    state = undefined;
    // Todo: We also have to navigate to / here
  }

  return appReducer(state, action);
};

export default rootReducer;
