import { ReportErrorRequest, Settings } from './apiTypes';
import { NetworkError, ServerError } from './errors';

const base =
  process.env.REACT_APP_API_BASE_URL ||
  (process.env.NODE_ENV === 'development'
    ? 'https://dev.api.study-campus.de'
    : 'https://api.study-campus.de');

export type AppCredentials = { token: string };

export class session {
  token: AppCredentials['token'];

  constructor(creds: AppCredentials) {
    this.token = creds.token;
  }

  static sendAdvanced = async (
    path: string,
    headers: HeadersInit,
    body: any
  ): Promise<any> => {
    let httpResponse;
    try {
      httpResponse = await fetch(base + path, {
        method: 'post',
        headers,
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

  send = (path: string, body: any = null): Promise<any> =>
    session.sendAdvanced(
      path,
      {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
      body
    );

  syncSettings = (deviceId: string, settings: Settings): Promise<void> =>
    this.send('/account/settings', { deviceId, settings });

  subscribePNS = (
    registrationId: string,
    registrationType: 'APNS' | 'FCM'
  ): Promise<void> =>
    this.send('/account/subscribepns', { registrationId, registrationType });

  static reportError = async (errorData: ReportErrorRequest): Promise<void> => {
    this.sendAdvanced(
      '/reporterror',
      {
        'Content-Type': 'application/json',
      },
      errorData
    );
  };
  reportError = async (errorData: ReportErrorRequest): Promise<void> => {
    this.send('/reporterror', errorData);
  };
}
