import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as ReactRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import reportWebVitals from './reportWebVitals';
import rootReducer from './redux';
import { update } from './redux/sync';
import ErrorBoundary from './ErrorBoundary';
import Routes from './Routes';
import './App.css';

const initializeCordova = () => {
  // Initialize plugins etc. here
};

const initializeReact = () => {
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
};

if (window.cordova)
  document.addEventListener(
    'deviceready',
    () => initializeCordova() || initializeReact(),
    false
  );
else initializeReact();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
