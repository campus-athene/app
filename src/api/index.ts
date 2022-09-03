import {
  AppointmentsResult,
  CourseDetailsResult,
  CourseOffersResult,
  CourseRegistrationRequest,
  CoursesResult,
  LoginResult,
  MessagesResult,
  ReportErrorRequest,
  Settings,
} from './apiTypes';
import dummyResponse from './dummyResponse';
import { NetworkError, ServerError } from './errors';
const base =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3010'
    : 'https://campus.akamu.de';

export type AppCredentials = { dummy: boolean; token: string };

export class session {
  dummy: AppCredentials['dummy'];
  token: AppCredentials['token'];

  constructor(creds: AppCredentials) {
    this.dummy = creds.dummy;
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

  static login = (username: string, password: string): Promise<LoginResult> =>
    session.sendAdvanced(
      '/account/login',
      {
        'Content-Type': 'application/json',
      },
      { username, password }
    );

  syncSettings = (deviceId: string, settings: Settings): Promise<void> =>
    this.send('/account/settings', { deviceId, settings });

  subscribePNS = (
    registrationId: string,
    registrationType: 'APNS' | 'FCM'
  ): Promise<void> =>
    this.send('/account/subscribepns', { registrationId, registrationType });

  // sync = () => this.send('/tucan/sync');

  getMessages = (): Promise<MessagesResult> => this.send('/tucan/messages');

  getAppointments = (): Promise<AppointmentsResult> =>
    this.send('/tucan/appointments');

  getCourses = (): Promise<CoursesResult> => this.send('/tucan/courses');

  getCourseDetails = (args: { id: number }): Promise<CourseDetailsResult> =>
    this.send('/tucan/coursedetails', args);

  // getExams = (): Promise<ExamsResult> => this.send('/tucan/exams');

  getCourseOffers = (
    args: null | { major: number; area: number; rootList: number } = null
  ): Promise<CourseOffersResult> => this.send('/tucan/courseoffers', args);

  // getExamGrades = (examId: number): Promise<ExamGradesResult> =>
  //   this.send('/tucan/examgrades', { exam: examId });

  markMsgRead = async (messageId: number): Promise<void> =>
    this.send('/tucan/markmsgread', { messageId });

  markAllMsgsRead = (): Promise<void> => this.send('/tucan/markallmsgsread');

  registerCourse = async (
    rgtrArgs: CourseRegistrationRequest
  ): Promise<CourseOffersResult> =>
    this.send('/tucan/registercourse', rgtrArgs);

  // registerExam = async (
  //   id: number,
  //   semester: number,
  //   type: 'register' | 'unregister'
  // ): Promise<ExamsResult> =>
  //   this.send('/tucan/registerexam', { id, semester, type });

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
