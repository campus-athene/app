import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { Action, combineReducers } from 'redux';
import { log } from '../app/errorReporting';
import auth from '../features/auth/authSlice';
import canteenData from '../features/canteen/canteenData';
import canteenSettings from '../features/canteen/canteenSettings';
import offers from '../features/courses/offersSlice';
import eventApi from '../features/events/eventApi';
import news from '../features/news/newsSlice';
import settings from '../features/settings/settingsSlice';
import sideMenu from '../features/sideMenu/sideMenuSlice';
import global from './globalSlice';

const appReducer = combineReducers({
  auth,
  global,
  sideMenu,
  settings,

  [eventApi.reducerPath]: eventApi.reducer,
  [canteenData.reducerPath]: canteenData.reducer,

  news,
  canteenSettings,

  // data
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
      .concat(eventApi.middleware)
      .concat(canteenData.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunkAction<
  ReturnType = void,
  ExtraThunkArg = unknown
> = ThunkAction<ReturnType, RootState, ExtraThunkArg, Action<string>>;

export default store;
