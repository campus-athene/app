import { createSlice } from '@reduxjs/toolkit';
import { log } from '../../app/errorReporting';
import * as api from '../../provider/api';
import { AppThunkAction, RootState } from '../../redux';
import { setupPush } from './pushNotifications';

type PrivacyLevel = 'complete' | 'balanced' | 'minimal';
type Topic = 'messages';

type SettingsState = {
  onboardingComplete: boolean;
  privacy: { level: PrivacyLevel } | null;
  push: { [key in Topic]: boolean } | null;
};

const loadState = (state: SettingsState) => {
  try {
    const tryParse = <TargetType>(data: string | null) => {
      if (data === null) return null;
      try {
        return JSON.parse(data) as TargetType;
      } catch (_e) {
        return null;
      }
    };
    state.onboardingComplete =
      tryParse(localStorage.getItem('onboardingComplete')) || false;
    state.privacy =
      (localStorage.getItem('privacy') && {
        level: localStorage.getItem('privacy') as PrivacyLevel,
      }) ||
      null;
    state.push = tryParse(localStorage.getItem('push'));
    if (state.push && state.push.messages) setupPush();
  } catch (e) {
    log('error', 'settingsSlice.loadState threw an error.', e);
  }
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: { push: null } as SettingsState,
  reducers: {
    setOnboardingCompleteValue: (settings, { payload }) => {
      settings.onboardingComplete = !payload || payload.isComplete !== false;
      localStorage.setItem(
        'onboardingComplete',
        JSON.stringify(settings.onboardingComplete)
      );
    },
    setPrivacy: (settings, { payload: { level } }) => {
      settings.privacy = { level };
      localStorage.setItem('privacy', level);
    },
    setPushNotif: (settings, { payload: { messages } }) => {
      // Todo: Send updated notification settings to server.

      if (messages) setupPush();

      if (!settings.push) settings.push = { messages };
      else settings.push.messages = messages;

      localStorage.setItem('push', JSON.stringify(settings.push));
    },
  },
  extraReducers: (builder) => {
    builder.addCase('@@INIT', loadState);
  },
});

const { setOnboardingCompleteValue } = settingsSlice.actions;
export const { setPrivacy, setPushNotif } = settingsSlice.actions;

export const setOnboardingComplete: () => AppThunkAction = () => (dispatch) => {
  dispatch(setOnboardingCompleteValue({ isComplete: true }));
  dispatch(syncSettings());
};

export const syncSettings: () => AppThunkAction =
  () => (_dispatch, getState) => {
    const state = getState();

    // Do not send settings to server until onboarding has been completed.
    // setOnboardingComplete will sync settings once called.
    if (!selectOnboardingComplete()(state)) return;

    api.syncSettings({
      privacy: selectPrivacy()(state)?.level || 'minimal',
      push: {
        messages: selectPushEnabled('messages')(state) || false,
      },
    });
  };

export const selectOnboardingComplete =
  () =>
  ({ settings: { onboardingComplete } }: RootState) =>
    onboardingComplete;

export const selectNeedsNotificationSetup =
  () =>
  ({ settings: { push } }: RootState) =>
    !push && true;

export const selectNeedsPrivacySetup =
  () =>
  ({ settings: { privacy } }: RootState) =>
    !privacy;

export const selectPushEnabled =
  (topic: Topic) =>
  ({ settings: { push } }: RootState) =>
    push && push[topic];

export const selectPrivacy =
  () =>
  ({ settings: { privacy } }: RootState) =>
    privacy || null;

export default settingsSlice.reducer;
