import { createSlice } from '@reduxjs/toolkit';
import { AppCredentials, session } from '../../api';
import { ServerError } from '../../api/errors';
import { log } from '../../errorReporting';
import { AppThunkAction, RootState } from '../../redux';
import { update } from '../../redux/sync';

type AuthState = {
  creds: AppCredentials | null;
};

const loadState = (state: AuthState) => {
  try {
    const json = localStorage.getItem('creds');
    if (json) state.creds = JSON.parse(json);
  } catch (e) {
    log('error', 'authSlice.loadState threw an error.', e);
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: { creds: null } as AuthState,
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

export const login: (
  username: string,
  password: string
) => AppThunkAction<Promise<string | null>> =
  (username, password) => async (dispatch) => {
    const dummy = username === 'demomode';
    if (!dummy && !(username && password))
      return 'Bitte vervollständige Deine Eingaben.';

    try {
      if (dummy) {
        await new Promise((r) => setTimeout(r, 4000));
        dispatch(updateCreds({ creds: { dummy: true } }));
      } else {
        const { token } = await session.login(username, password);
        dispatch(updateCreds({ creds: { token } }));
      }

      dispatch(update());
      return null;
    } catch (error) {
      log('warning', 'An error occured in authSlice.login', error);
      return error instanceof ServerError
        ? error.message
        : 'Ein Fehler ist aufgetreten.';
    }
  };

export const logout: () => AppThunkAction = () => (dispatch) => {
  const { history } = window;
  history.go(1 - history.length);
  history.replaceState(null, '', '/');

  dispatch({
    type: 'LOGOUT',
  });
};

export const selectCreds =
  () =>
  ({ auth: { creds } }: RootState) =>
    creds;

export default authSlice.reducer;
