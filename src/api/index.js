import dummyResponse from './dummyResponse';
import { NetworkError } from './errors';
const base =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3010'
    : 'https://dffblc0bqe.execute-api.eu-central-1.amazonaws.com/v2';

export class session {
  constructor(creds) {
    this.dummy = creds.dummy;
    this.token = creds.token;
  }

  static sendAdvanced = async (path, headers, body) => {
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

    return await httpResponse.json();
  };

  send = (path, body = null) =>
    this.dummy
      ? dummyResponse(path, body)
      : session.sendAdvanced(
          path,
          {
            Authorization: `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          },
          body
        );

  static login = (username, password) =>
    session.sendAdvanced(
      '/account/login',
      {
        'Content-Type': 'application/json',
      },
      { username, password }
    );

  subscribePNS = (registrationId, registrationType) =>
    this.send('/account/subscribepns', { registrationId, registrationType });

  sync = () => this.send('/tucan/sync');

  getCourseOffers = (major, area, rootList) =>
    this.send('/tucan/courseoffers', { major, area, rootList });

  getExamGrades = (examId) => this.send('/tucan/examgrades', { exam: examId });

  markMsgRead = async (messageId) =>
    this.send('/tucan/markmsgread', { messageId });

  markAllMsgsRead = () => this.send('/tucan/markallmsgsread');

  registerCourse = async (rgtrArgs) =>
    this.send('/tucan/registercourse', rgtrArgs);

  registerExam = async (id, semester, type) =>
    this.send('/tucan/registerexam', { id, semester, type });

  reportError = async (errorData) => {
    this.send('/reporterror', errorData);
  };
}
