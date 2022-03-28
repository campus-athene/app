import { createSlice } from '@reduxjs/toolkit';
import { session } from '../../api';
import { log } from '../../errorReporting';
import { setupPush } from './pushNotifications';

const loadState = (state) => {
  try {
    state.onboardingComplete = localStorage.getItem('onboardingComplete');
    state.privacy =
      (localStorage.getItem('privacy') && {
        level: localStorage.getItem('privacy'),
      }) ||
      null;
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
      deviceId = Buffer.from(
        crypto.getRandomValues(new Uint8Array(8))
      ).toString('hex');
      localStorage.setItem('deviceId', deviceId);
    }
    state.deviceId = deviceId;
    state.push = JSON.parse(localStorage.getItem('push')) || null;
    if (state.push && state.push.messages) setupPush();
  } catch (e) {
    log('error', 'settingsSlice.loadState threw an error.', e);
  }
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: { push: null },
  reducers: {
    setOnboardingComplete: (settings, { payload }) => {
      settings.onboardingComplete = !payload || payload.isComplete !== false;
      localStorage.setItem('onboardingComplete', settings.onboardingComplete);
    },
    setPrivacy: (settings, { payload: { level } }) => {
      settings.privacy = { level };
      localStorage.setItem('privacy', level);
    },
    setPushNotif: (settings, { payload: { messages } }) => {
      if (!settings.push) settings.push = {};

      // Todo: Send updated notification settings to server.

      if (messages) setupPush();
      settings.push.messages = messages;
      localStorage.setItem('push', JSON.stringify(settings.push));
    },
  },
  extraReducers: (builder) => {
    builder.addCase('@@INIT', loadState);
  },
});

export const { setOnboardingComplete, setPrivacy, setPushNotif } =
  settingsSlice.actions;

export const syncSettings = () => (_dispatch, getState) => {
  const state = getState();
  const creds = state.auth.creds;
  new session(creds).syncSettings(selectDeviceId()(state), {
    privacy: selectPrivacy()(state).level,
    push: {
      messages: selectPushEnabled('messages')(state),
    },
  });
};

export const selectDeviceId =
  () =>
  ({ settings: { deviceId } }) =>
    deviceId;

export const selectOnboardingComplete =
  () =>
  ({ settings: { onboardingComplete } }) =>
    onboardingComplete;

export const selectNeedsNotificationSetup =
  () =>
  ({ settings: { push } }) =>
    !push && true;

export const selectNeedsPrivacySetup =
  () =>
  ({ settings: { privacy } }) =>
    !privacy;

export const selectPushEnabled =
  (topic) =>
  ({ settings: { push } }) =>
    push[topic];

export const selectPrivacy =
  () =>
  ({ settings: { privacy } }) =>
    privacy || null;

export default settingsSlice.reducer;
