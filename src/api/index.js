import dummyResponse from './dummyResponse';
import { NetworkError, ServerError } from './errors';
const base =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3010'
    : 'https://campus.akamu.de';

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

    if (!httpResponse.ok) {
      console.error(`Server returned error code ${httpResponse.status}.`);
      let body;
      try {
        body = await httpResponse.json();
      } catch (_) {}
      if (typeof body.message === 'string') {
        throw new ServerError(body);
      }
      throw new ServerError();
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

  syncSettings = (deviceId, settings) => {
    this.send('/account/settings', { deviceId, settings });
  };

  subscribePNS = (registrationId, registrationType) =>
    this.send('/account/subscribepns', { registrationId, registrationType });

  sync = () => this.send('/tucan/sync');

  getMessages = () => this.send('/tucan/messages');

  // getAppointments = () => this.send('/tucan/appointments');

  getCourses = () => this.send('/tucan/courses');

  // getExams = () => this.send('/tucan/exams');

  // args is either { major, area, rootList } or null.
  getCourseOffers = (args = null) => this.send('/tucan/courseoffers', args);

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
