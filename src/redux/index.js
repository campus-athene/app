import { combineReducers } from 'redux';
import auth from './auth';
import sync from './sync';
import corona from './corona';
import courseOffers from './courseOffers';
import exams from './exams';
import courseReg from './courseReg';

export default combineReducers({
  auth,
  sync,

  // data
  corona,
  courseOffers,
  exams,

  // UI state
  courseReg
});
