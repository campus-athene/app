import { storeRef } from '..';
import { selectCreds } from '../features/auth/authSlice';
import { selectPrivacy } from '../features/settings/settingsSlice';
import { session } from '../provider/api';
import { RootState } from '../redux';

export const log = (
  level: 'error' | 'warning' | 'info',
  message: string,
  data?: unknown
) => {
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

    const state = (storeRef.store as any).getState() as RootState;
    const privacy = selectPrivacy()(state)?.level;
    const creds = selectCreds()(state);

    if (privacy !== 'complete' && privacy !== 'balanced') return;

    let serializedData;

    try {
      serializedData = JSON.stringify(data);
    } catch (e) {
      serializedData = String(data);
    }

    const report = {
      level,
      timestamp: Date.now(),
      privacy,
      message,
      data: serializedData,
    };

    creds
      ? new session(creds).reportError(report)
      : session.reportError(report);
  } catch (e) {}
};
