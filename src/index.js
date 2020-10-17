import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './redux';
import { update } from './redux/sync';
import Router from './Router';
import './App.css';

const store = configureStore({
  reducer: rootReducer,
});
// Check for outdated or missing state and fetch is asyncronously from the server.
store.dispatch(update());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
