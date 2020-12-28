import { combineReducers } from 'redux';
import auth from '../features/auth/state';
import sync from './sync';
import messages from '../features/messages/messagesSlice';
import offers from '../features/courses/offersSlice';
import exams from '../features/exams/examsSlice';

const appReducer = combineReducers({
  auth,
  sync,

  // data
  messages,
  offers,
  exams,
});

export default (state, action) => {
  if (action.type === 'LOGOUT') {
    localStorage.clear();
    state = undefined;
    // Todo: We also have to navigate to / here
  }

  return appReducer(state, action);
}
