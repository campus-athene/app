import { createSlice } from '@reduxjs/toolkit';
import { log } from '../../app/errorReporting';
import { AppCredentials } from '../../provider/api';
import { AppThunkAction, RootState } from '../../redux';

type CampusNetCreds = { username: string; password: string };

type AuthState = {
  /**
   * Deprecated and now read only.
   * @deprecated
   */
  creds: AppCredentials | null;
  campusNetCreds: CampusNetCreds | null;
  moodle: { token: string; privateToken: string } | null;
};

const initialState: AuthState = {
  creds: null,
  campusNetCreds: null,
  moodle: null,
};

const loadState = (state: AuthState) => {
  try {
    const moodleToken = localStorage.getItem('moodleToken');
    const moodlePrivateToken = localStorage.getItem('moodlePrivateToken');
    if (moodleToken && moodlePrivateToken)
      state.moodle = { token: moodleToken, privateToken: moodlePrivateToken };

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
    updateCampusNetCreds: (
      state,
      { payload }: { payload: { creds: CampusNetCreds } }
    ) => {
      state.campusNetCreds = payload.creds;
      localStorage.setItem('campusNetCreds', JSON.stringify(payload.creds));
    },
    updateMoodleToken: (state, { payload }: { payload: string | null }) => {
      console.log('updateMoodleToken', payload);
      const params = payload && atob(payload).split(':::');
      if (!params || params.length !== 3) {
        state.moodle = null;
        localStorage.removeItem('moodleToken');
        localStorage.removeItem('moodlePrivateToken');
        console.log('Failed to parse moodleToken', payload);
        return;
      }
      // params[0] is the signature which we ignore
      state.moodle = { token: params[1], privateToken: params[2] };
      console.log('moodleToken', state.moodle);
      localStorage.setItem('moodleToken', params[1]);
      localStorage.setItem('moodlePrivateToken', params[2]);
    },
  },
  extraReducers: (builder) => {
    builder.addCase('@@INIT', loadState);
  },
});

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
  ({ auth: { moodle } }: RootState) =>
    moodle && moodle.token;

export default authSlice.reducer;
