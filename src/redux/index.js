import { combineReducers } from 'redux';
import auth from './auth';
import courseOffers from './courseOffers';
import exams, { loadExams } from './exams';
import courseReg from './courseReg';

export const update = () => (dispatch, getState) => {
  const state = getState();

  if (!state.auth.creds)
    return;

  dispatch(loadExams());
}

export default combineReducers({
  auth,
  courseOffers,
  exams,

  // UI state
  courseReg
});
