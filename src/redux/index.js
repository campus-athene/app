import { combineReducers } from 'redux';
import auth from '../features/auth/state';
import sync from './sync';
import messages from '../features/messages/state';
import courseOffers from '../features/courses/offersState';
import exams from '../features/exams/state';
import courseReg from '../features/courses/regState';

export default combineReducers({
  auth,
  sync,

  // data
  messages,
  courseOffers,
  exams,

  // UI state
  courseReg
});
