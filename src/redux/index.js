import { combineReducers } from 'redux';
import auth from './auth';
import sync from './sync';
import messages from './messages';
import courseOffers from './courseOffers';
import exams from './exams';
import courseReg from './courseReg';

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
