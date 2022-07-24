import { combineReducers } from 'redux';
import { log } from '../errorReporting';
import auth from '../features/auth/authSlice';
import common from '../features/common/commonSlice';
import settings from '../features/settings/settingsSlice';
import news from '../features/news/newsSlice';
import messages from '../features/messages/messagesSlice';
import courses from '../features/courses/coursesSlice';
import offers from '../features/courses/offersSlice';
import { configureStore } from '@reduxjs/toolkit';

const appReducer = combineReducers({
  auth,
  common,
  settings,

  news,

  // data
  messages,
  courses,
  offers,
});

// Can not use RootState or AppDispatch here as it would be a circular reference.
const rootReducer = (state: any, action: any) => {
  if (action.type === 'LOGOUT') {
    localStorage.clear();
    state = undefined;
    // Todo: We also have to navigate to / here
  }

  if (action.type === '@@INIT' && state)
    log(
      'warning',
      'An @@INIT action occured even though the state is not empty.'
    );
  if (!state) {
    if (action.type !== '@@INIT')
      log('warning', 'State is empty but action.type is not @@INIT.', action);
    action.type = '@@INIT';
  }

  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
