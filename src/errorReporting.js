import { storeRef } from '.';
import { session } from './api';
import { selectCreds } from './features/auth/authSlice';
import { selectPrivacy } from './features/settings/settingsSlice';

export const log = (level, message, data) => {
  try {
    const log =
      level === 'error'
        ? console.error
        : level === 'info'
        ? console.info
        : console.log;
    log(message);
    log(data);

    if (process.env.NODE_ENV === 'development') return;

    const state = storeRef.store.getState();
    const privacy = selectPrivacy()(state)?.level;
    const creds = selectCreds()(state);

    if (privacy === 'minimal') return;

    let serializedData;

    try {
      serializedData = JSON.stringify(data);
    } catch (e) {
      serializedData = String(data);
    }

    new session(creds).reportError({
      level,
      timestamp: Date.now(),
      privacy,
      message,
      data: serializedData,
    });
  } catch (e) {}
};
