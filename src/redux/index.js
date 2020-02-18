import { combineReducers } from 'redux';
import auth from './auth';
import exams, { loadExams } from './exams';

export const update = () => (dispatch, getState) => {
  const state = getState();

  if (!state.auth.creds)
    return;
  
  dispatch(loadExams());
}

export default combineReducers({
  auth,
  exams
});
