import { storeRef } from '..';
import { selectPrivacy } from '../features/settings/settingsSlice';
import * as api from '../provider/api';
import { RootState } from '../redux';

export const log = (
  level: 'error' | 'warning' | 'info',
  message: string,
  data?: unknown,
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

    api.reportError(report);
  } catch (e) {
    console.error('Failed to report error to API.', e);
  }
};
