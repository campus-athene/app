import { createSlice } from '@reduxjs/toolkit';
import { log } from '../../app/errorReporting';
import { AppCredentials } from '../../provider/tucan';
import { AppThunkAction, RootState } from '../../redux';

type CampusNetCreds = { username: string; password: string };

type AuthState = {
  creds: AppCredentials | null;
  campusNetCreds: CampusNetCreds | null;
  moodleToken: string | null;
};

const initialState: AuthState = {
  creds: null,
  campusNetCreds: null,
  moodleToken: null,
};

const loadState = (state: AuthState) => {
  try {
    state.moodleToken = localStorage.getItem('moodle');
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
  initialState,
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
    updateMoodleToken: (state, { payload }: { payload: string }) => {
      state.moodleToken = payload;
      if (payload) localStorage.setItem('moodle', payload);
      else localStorage.removeItem('moodle');
    },
  },
  extraReducers: (builder) => {
    builder.addCase('@@INIT', loadState);
  },
});

const { updateCreds } = authSlice.actions;
export const { updateCampusNetCreds, updateMoodleToken } = authSlice.actions;

export const logout: () => AppThunkAction = () => (dispatch) => {
  const { history } = window;
  history.go(1 - history.length);
  history.replaceState(null, '', '/');

  dispatch({
    type: 'LOGOUT',
  });
};

/** @deprecated */
export const selectCreds =
  () =>
  ({ auth: { creds } }: RootState) =>
    creds;

export const selectCampusNetCreds =
  () =>
  ({ auth: { campusNetCreds } }: RootState): CampusNetCreds | null =>
    campusNetCreds;

export const selectMoodleToken =
  () =>
  ({ auth: { moodleToken } }: RootState) =>
    moodleToken;

export default authSlice.reducer;
