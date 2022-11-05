import { Semester } from './semesters';

declare type CourseRegArgs = [
  number,
  string,
  number,
  number,
  number,
  number,
  number,
  string,
  number
];

declare type CourseRegHint = number[];

export type LoginResult = {
  token: string;
};

export type Settings = {
  privacy: 'complete' | 'balanced' | 'minimal';
  push: {
    messages: boolean;
  };
};

export type MessagesResult = {
  messages: {
    id: number;
    subject: string;
    body: string;
    date: string;
    time: string;
    unread: boolean;
    from: string;
  }[];
};

export type AppointmentsResult = {
  appointments: {
    id: number;
    name: string;
    instructor: string;
    room: string;
    timeStart: string;
    timeEnd: string;
  }[];
};

export type Course = {
  id: number;
  groupId: number;
  code: string;
  name: string;
  instructor: string;
};

export type Module = {
  code: string;
  name: string;
  instructor: string;
  semester: Semester;
  courses: Course[];
};

export type CoursesResult = {
  modules: Module[];
};

export type CourseDetailsResult = {
  id: number;
  details: { title: string; value: string }[];
};

// export type ExamsResult = {
//   exams: ({
//     id: number;
//     code: string;
//     courseName: string;
//     examName: string;
//   } & (
//     | {
//         date: string;
//         semester: tucan.Semester;
//         status: 'none' | 'selected' | 'register' | 'unregister' | 'unknown';
//         regArgs: tucan.ExamRegArgs | tucan.ExamUregArgs | null;
//       }
//     | {
//         date: string | null;
//         semester: tucan.Semester;
//         grade: string | null;
//       }
//   ))[];
// };

export type CourseOffer = {
  id: number;
  code: string;
  name: string;
  instructor: string;
  status: 'register' | 'unregister' | 'special' | 'none';
  regArgs: CourseRegArgs | null;
  regHint: CourseRegHint | null;
};

export type ModuleOffer = {
  id: number;
  code: string;
  name: string;
  instructor: string;
  courses: CourseOffer[];
  status: 'register' | 'unregister' | 'ignore' | 'edit';
  regArgs: CourseRegArgs | null;
};

export type CourseOffersResult = {
  offers: {
    id: number;
    major: number;
    area: number;
    name: string;
    modules: ModuleOffer[];
    areas: {
      id: number;
      major: number;
      rootList: number;
      name: string;
    }[];
  }[];
};

// export type ExamGradesResult = {
//   grades: tucan.ExamGrades | null;
// };

export type CourseRegistrationRequest = {
  action: 'edit';
  // course: ({ regArgs: CourseRegArgs } | { regHint: CourseRegHint });
  courses: ({ regArgs: CourseRegArgs } | { regHint: CourseRegHint })[];
  module: { regArgs: CourseRegArgs } | { regHint: CourseRegHint };
};

export type ReportErrorRequest = {
  level: 'error' | 'warning' | 'info';
  timestamp: number;
  privacy: 'complete' | 'balanced';
  message: string;
  data: string;
};
