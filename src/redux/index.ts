import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { AnyAction, combineReducers } from 'redux';
import mainApi from '../api/mainApi';
import { log } from '../errorReporting';
import auth from '../features/auth/authSlice';
import canteenData from '../features/canteen/canteenData';
import common from '../features/common/commonSlice';
import settings from '../features/settings/settingsSlice';
import news from '../features/news/newsSlice';
import canteenSettings from '../features/canteen/canteenSettings';
import messages from '../features/messages/messagesSlice';
import courses from '../features/courses/coursesSlice';
import offers from '../features/courses/offersSlice';

const appReducer = combineReducers({
  auth,
  common,
  settings,

  [mainApi.reducerPath]: mainApi.reducer,
  [canteenData.reducerPath]: canteenData.reducer,

  news,
  canteenSettings,

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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(mainApi.middleware)
      .concat(canteenData.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunkAction<
  ReturnType = void,
  ExtraThunkArg = unknown
> = ThunkAction<ReturnType, RootState, ExtraThunkArg, AnyAction>;

export default store;
