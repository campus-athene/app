import { Semester } from '@campus/campusnet-sdk';

const pageRoutes = {
  home: () => '/home',
  messages: () => '/home/messages',
  canteen: () => '/home/canteen',
  news: () => '/home/news',
  wiki: () => '/home/wiki',
  calendar: (day?: number) =>
    day === undefined ? '/calendar' : `/calendar?day=${day}`,
  study: () => '/study',
  courseDetails: (semester: Semester, number: string) =>
    `/study/course/detail/semester/${semester}/${encodeURIComponent(number)}`,
  courseReg: (params?: { major: number; area: number; list: number }) =>
    params
      ? `/study/courseReg/list/${params.major}/${params.area}/${params.list}`
      : `/study/courseReg/root`,
  courseRegDetail: (
    major: number,
    area: number,
    list: number,
    module: number,
  ) => `/study/course/detail/list/${major}/${area}/${list}/${module}`,
  map: () => '/map',
  mapSingle: (map: string) => `/map/${encodeURIComponent(map)}`,
  profile: () => '/profile',
  documents: () => '/profile/documents',
};

export default pageRoutes;
