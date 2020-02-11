import { combineReducers } from 'redux';
import user from './user';
import exams from './exams';

export default combineReducers({
  user,
  exams
});
