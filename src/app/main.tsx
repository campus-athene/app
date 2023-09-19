/* global SafariViewController */

import { Capacitor } from '@capacitor/core';
import { StatusBar } from '@capacitor/status-bar';
import { setupIonicReact } from '@ionic/react';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store, { AppStore } from '../redux';
import { setStatusBarHeight } from '../redux/globalSlice';
import { UpdateEffect } from '../redux/sync';
import App from './App';
import { log } from './errorReporting';
import muiTheme from './muiTheme';

declare global {
  interface Window {
    StatusBarHeight?: {
      getValue(
        successCallback: (value: number) => void,
        errorCallback: (error: any) => void,
      ): void;
    };
  }
}

export const storeRef: { store: AppStore | null } = { store: null };

const initializeCordova = () => {
  // Initialize plugins etc. here

  window.SafariViewController?.isAvailable((isAvailable) => {
    if (isAvailable)
      (window.open as any) = (
        url: string,
        _target: unknown,
        options: Partial<SafariViewControllerShowOptions>,
      ) =>
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
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: import.meta.env.PROD,
      },
    },
  });

  const statusBarPromise =
    window.StatusBarHeight &&
    new Promise((res, rej) =>
      window.StatusBarHeight!.getValue(
        (value) => {
          store.dispatch(setStatusBarHeight(value));
          res(value);
        },
        (error) => {
          log(
            'error',
            'window.StatusBarHeight.getValue threw an error.',
            error,
          );
          rej(error);
        },
      ),
    );

  await statusBarPromise;

  setupIonicReact();

  const root = createRoot(document.getElementById('root')!);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {/* Check for outdated or missing state and fetch is asyncronously from the server. */}
          <UpdateEffect />
          <ThemeProvider theme={muiTheme}>
            <App />
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </React.StrictMode>,
  );
};

if ((window as any).cordova)
  document.addEventListener(
    'deviceready',
    () => {
      initializeCordova();
      initializeReact();
    },
    false,
  );
else initializeReact();

// Creds is not being used anymore any stores sensitive data.
localStorage.removeItem('creds');
