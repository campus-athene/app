/* global SafariViewController */

import { Capacitor } from '@capacitor/core';
import { StatusBar } from '@capacitor/status-bar';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter as ReactRouter } from 'react-router-dom';
import './app/App.css';
import ErrorBoundary from './app/ErrorBoundary';
import { log } from './app/errorReporting';
import Routes from './app/Routes';
import SideMenu from './features/sideMenu/SideMenu';
import store from './redux';
import { setStatusBarHeight } from './redux/globalSlice';
import { UpdateEffect } from './redux/sync';

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

  await statusBarPromise;

  const root = createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        {/* Check for outdated or missing state and fetch is asyncronously from the server. */}
        <UpdateEffect />
        <ReactRouter>
          <ErrorBoundary>
            <Routes />
            <SideMenu />
          </ErrorBoundary>
        </ReactRouter>
      </Provider>
    </React.StrictMode>
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