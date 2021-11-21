import { createSlice } from '@reduxjs/toolkit';
import { session } from '../../api';
import { log } from '../../errorReporting';
import { update } from '../../redux/sync';
import { historyRef } from '../../Routes';

const loadState = (state) => {
  try {
    state.creds = JSON.parse(localStorage.getItem('creds')) || null;
  } catch (e) {
    log('error', 'authSlice.loadState threw an error.', e);
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: { creds: null },
  reducers: {
    updateCreds: (state, { payload: { creds } }) => {
      state.creds = creds;
      localStorage.setItem('creds', JSON.stringify(creds));
    },
  },
  extraReducers: (builder) => {
    builder.addCase('@@INIT', loadState);
  },
});

export const { updateCreds } = authSlice.actions;

export const login = (username, password) => async (dispatch) => {
  if (!username || !password) return 'Bitte vervollständige deine Eingaben.';

  try {
    const dummy = username === 'dummy' && password === 'dummy';

    if (dummy) {
      await new Promise((resolve) => setTimeout(() => resolve(), 2000));
      dispatch(updateCreds({ creds: { dummy: true } }));
      dispatch(update());
      return null;
    }

    const { token } = await session.login(username, password);
    dispatch(updateCreds({ creds: { token } }));
    dispatch(update());
    return null;
  } catch (error) {
    return error instanceof Error ? error.message : String(error);
  }
};

export const logout = () => (dispatch) => {
  const { history } = historyRef;
  history.go(1 - history.length);
  history.replace('/');

  dispatch({
    type: 'LOGOUT',
  });
};

export const selectProcessing =
  () =>
  ({ auth: { processing } }) =>
    processing;
export const selectError =
  () =>
  ({ auth: { error } }) =>
    error;

export const selectCreds =
  () =>
  ({ auth: { creds } }) =>
    creds;

export default authSlice.reducer;
