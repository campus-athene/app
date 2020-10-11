import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './redux';
import { update } from './redux/sync';
import Router from './Router';
import './App.css';

const store = configureStore({
  reducer: rootReducer
});

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
