import { createSlice } from '@reduxjs/toolkit';
import { log } from '../../app/errorReporting';
import { AppCredentials } from '../../provider/tucan';
import { AppThunkAction, RootState } from '../../redux';

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
