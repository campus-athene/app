import { createSlice } from '@reduxjs/toolkit';
import { log } from '../../app/errorReporting';
import { AppCredentials, session } from '../../provider/tucan';
import { ServerError } from '../../provider/tucan/errors';
import { AppThunkAction, RootState } from '../../redux';
import { update } from '../../redux/sync';

type CampusNetCreds = { username: string; password: string };

type AuthState = {
  creds: AppCredentials | null;
  campusNetCreds: CampusNetCreds | null;
};

const loadState = (state: AuthState) => {
  try {
    const credsJson = localStorage.getItem('creds');
    if (credsJson) state.creds = JSON.parse(credsJson);
    const campusNetCredsJson = localStorage.getItem('campusNetCreds');
    if (campusNetCredsJson)
      state.campusNetCreds = JSON.parse(campusNetCredsJson);
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
    updateCampusNetCreds: (
      state,
      { payload }: { payload: { creds: CampusNetCreds } }
    ) => {
      state.campusNetCreds = payload.creds;
      localStorage.setItem('campusNetCreds', JSON.stringify(payload.creds));
    },
  },
  extraReducers: (builder) => {
    builder.addCase('@@INIT', loadState);
  },
});

export const { updateCreds, updateCampusNetCreds } = authSlice.actions;

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
        dispatch(updateCampusNetCreds({ creds: { username, password } }));
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

export const selectCampusNetCreds =
  () =>
  ({ auth: { campusNetCreds } }: RootState): CampusNetCreds | null =>
    campusNetCreds;

export default authSlice.reducer;
