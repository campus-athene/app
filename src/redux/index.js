import { combineReducers } from 'redux';
import auth from '../features/auth/state';
import sync from './sync';
import messages from '../features/messages/state';
import courseOffers from '../features/courses/offersState';
import exams from '../features/exams/examsSlice';
import courseReg from '../features/courses/regState';

const appReducer = combineReducers({
  auth,
  sync,

  // data
  messages,
  courseOffers,
  exams,

  // UI state
  courseReg
});

export default (state, action) => {
  if (action.type === 'LOGOUT') {
    localStorage.clear();
    state = undefined;
    // Todo: We also have to navigate to / here
  }

  return appReducer(state, action);
}
