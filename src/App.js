import React, { useEffect } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import rootReducer from './redux';
import { update } from './redux/sync';
import Router from './Router';

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware
  ));

const App = () => {
  // Check for outdated or missing state and fetch is asyncronously from the server.
  useEffect(() => store.dispatch(update()), []);

  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
