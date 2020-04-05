import { combineReducers } from 'redux';
import auth from './auth';
import sync from './sync';
import courseOffers from './courseOffers';
import exams from './exams';
import courseReg from './courseReg';

export default combineReducers({
  auth,
  sync,

  // data
  courseOffers,
  exams,

  // UI state
  courseReg
});
