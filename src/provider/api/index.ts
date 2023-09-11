import { getSessionId } from '../../app/common';
import { ReportErrorRequest, Settings } from './apiTypes';
import { NetworkError, ServerError } from './errors';

const base =
  process.env.REACT_APP_API_BASE_URL ||
  (process.env.NODE_ENV === 'development'
    ? 'https://dev.api.study-campus.de'
    : 'https://api.study-campus.de');

const send = async (
  path: string,
  body?: any,
  headers?: HeadersInit,
): Promise<any> => {
  let httpResponse;
  const sessionId = getSessionId();

  try {
    httpResponse = await fetch(base + path, {
      method: 'post',
      headers: {
        Authorization: `Bearer sid.${sessionId}`,
        'Content-Type': 'application/json',
        ...(headers || {}),
      },
      body: JSON.stringify(body || {}),
    });
  } catch (error) {
    throw new NetworkError('Keine Internetverbindung!');
  }

  if (!httpResponse.ok) {
    console.error(`Server returned error code ${httpResponse.status}.`);
    let body;
    try {
      body = await httpResponse.json();
    } catch (_) {}
    if (typeof body?.message === 'string') {
      throw new ServerError(body);
    }
    throw new ServerError();
  }

  return await httpResponse.json();
};

export const syncSettings = (
  username: string,
  settings: Settings,
): Promise<void> => send('/account/settings', { username, settings });

export const subscribePNS = (
  registrationId: string,
  registrationType: 'APNS' | 'FCM',
): Promise<void> =>
  send('/account/subscribepns', { registrationId, registrationType });

export const reportError = async (
  errorData: ReportErrorRequest,
): Promise<void> => send('/reporterror', errorData);
