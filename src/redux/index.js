import { combineReducers } from 'redux';
import auth from '../features/auth/authSlice';
import sync from './sync';
import settings from '../features/settings/settingsSlice';
import messages from '../features/messages/messagesSlice';
import courses from '../features/courses/coursesSlice';
import offers from '../features/courses/offersSlice';
import exams from '../features/exams/examsSlice';

const appReducer = combineReducers({
  auth,
  sync,
  settings,

  // data
  messages,
  courses,
  offers,
  exams,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    localStorage.clear();
    state = undefined;
    // Todo: We also have to navigate to / here
  }

  if (action.type === '@@INIT' && state)
    console.warn(
      'An @@INIT action occured even though the state is not empty.'
    );
  if (!state) {
    if (action.type !== '@@INIT')
      console.warn(`State is empty but action is '${action.type}'`);
    action.type = '@@INIT';
  }

  return appReducer(state, action);
};

export default rootReducer;
