import { createSlice } from '@reduxjs/toolkit';
import { session } from '../../api';

const loadState = (state) => {
  try {
    state.onboardingComplete = localStorage.getItem('onboardingComplete');
    state.privacy =
      (localStorage.getItem('privacy') && {
        level: localStorage.getItem('privacy'),
      }) ||
      null;
    state.push = JSON.parse(localStorage.getItem('push')) || null;
    if (state.push && state.push.messages) setupPush();
  } catch (e) {
    console.error(e);
  }
};

const setupPush = () => {
  if (!window.PushNotification) {
    console.warn('window.PushNotification is not defined.');
    return;
  }
  try {
    window.push = window.PushNotification.init({
      android: {},
      ios: { alert: true, badge: true, sound: true },
    });
    window.push.on('registration', ({ registrationId, registrationType }) => {
      // This is only a temoprary workaround and should be improved in the future.
      const creds = JSON.parse(localStorage.getItem('creds'));
      new session(creds).subscribePNS(registrationId, registrationType);
    });
    window.push.on('error', (e) => {
      console.error(e);
    });
  } catch (error) {
    console.error(error);
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
      if (messages && !window.push) setupPush();
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

export default settingsSlice.reducer;
