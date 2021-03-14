import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as ReactRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import rootReducer from './redux';
import { update } from './redux/sync';
import ErrorBoundary from './ErrorBoundary';
import Routes from './Routes';
import './App.css';

const store = configureStore({
  reducer: rootReducer,
});
// Check for outdated or missing state and fetch is asyncronously from the server.
store.dispatch(update());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactRouter>
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </ReactRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();
