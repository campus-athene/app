/* global SafariViewController */

import { Capacitor } from '@capacitor/core';
import { StatusBar } from '@capacitor/status-bar';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as ReactRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { log } from './errorReporting';
import { setStatusBarHeight } from './features/common/commonSlice';
import reportWebVitals from './reportWebVitals';
import rootReducer from './redux';
import { update } from './redux/sync';
import ErrorBoundary from './ErrorBoundary';
import Routes from './Routes';
import './App.css';
import SideMenu from './features/common/SideMenu';

export const storeRef = { store: null };

const initializeCordova = () => {
  // Initialize plugins etc. here

  window.SafariViewController?.isAvailable((isAvailable) => {
    if (isAvailable)
      window.open = (url, _target, options) =>
        SafariViewController.show({
          toolbarColor: '#372649',
          url,
          ...options,
        });
  });

  // For ios this is set in Info.plist
  if (Capacitor.getPlatform() === 'android')
    StatusBar.setOverlaysWebView({ overlay: true });
};

const initializeReact = async () => {
  const store = configureStore({
    reducer: rootReducer,
  });

  storeRef.store = store;

  const statusBarPromise =
    window.StatusBarHeight &&
    new Promise((res, rej) =>
      window.StatusBarHeight.getValue(
        (value) => {
          store.dispatch(setStatusBarHeight(value));
          res(value);
        },
        (error) => {
          log(
            'error',
            'window.StatusBarHeight.getValue threw an error.',
            error
          );
          rej(error);
        }
      )
    );

  // Check for outdated or missing state and fetch is asyncronously from the server.
  store.dispatch(update());

  await statusBarPromise;
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <ReactRouter>
          <ErrorBoundary>
            <Routes />
            <SideMenu />
          </ErrorBoundary>
        </ReactRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
};

// The exams area has been removed, therefor also remove the data.
localStorage.removeItem('exams');

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
