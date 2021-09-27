import { NetworkError, ServerError } from './errors';
const base =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3010'
    : 'https://dffblc0bqe.execute-api.eu-central-1.amazonaws.com/v2';

export class session {
  constructor(creds) {
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

    const response = await httpResponse.json();
    if (!response.success) throw new ServerError(response);
    return response;
  };

  send = (path, body = null) =>
    session.sendAdvanced(
      path,
      {
        Authorization: `tucan ${this.token}`,
        'Content-Type': 'application/json',
      },
      body
    );

  static login = (username, password) =>
    session.sendAdvanced(
      '/account/login2',
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
