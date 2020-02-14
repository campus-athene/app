import { combineReducers } from 'redux';
import auth from './auth';
import exams from './exams';

export default combineReducers({
  auth,
  exams
});
