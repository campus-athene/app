import {
  Module,
  useCoursesWithSelectorFromGroupedByModule,
} from '../../provider/camusnet/courses';
import {
  descriptions as semesterDescs,
  getRegSemester,
  getSemester,
  Semester,
} from '../../provider/tucan/semesters';

export const useCoursesBySemesterAndNumber = (
  semester?: number,
  number?: string
) =>
  useCoursesWithSelectorFromGroupedByModule((modules) => {
    if (semester === undefined || number === undefined)
      throw new Error('Selector from a disabled query was called.');
    return modules[semester][number];
  }, semester !== undefined && number !== undefined);

export const useCoursesFromCurrentSemester = () =>
  useCoursesWithSelectorFromGroupedByModule((modules) =>
    Object.values(modules[getSemester()] || {}).sort((a, b) =>
      a.number < b.number ? -1 : a.number > b.number ? 1 : 0
    )
  );

export const useCoursesGroupedBySemester = () =>
  useCoursesWithSelectorFromGroupedByModule((modules) =>
    [
      ...Object.keys({ [getRegSemester()]: null, ...modules }).map((key) => {
        const semester = Number.parseInt(key) as Semester;
        return {
          id: semester,
          name: semesterDescs[semester] || 'Sonstige',
          courses: Object.values(modules[semester] || {}),
        };
      }),
    ].sort((a, b) => b.id - a.id)
  );

export const getCourseColor = (
  { number }: Pick<Module, 'number'>,
  s: number,
  bl: number
) => {
  // https://www.30secondsofcode.org/js/s/hsb-to-rgb
  const HSBToRGB = (h: number, s: number, b: number) => {
    s /= 100;
    b /= 100;
    const k = (n: number) => (n + h / 60) % 6;
    const f = (n: number) =>
      b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
    return [255 * f(5), 255 * f(3), 255 * f(1)].map((n) => Math.floor(n));
  };

  const hash =
    (new TextEncoder().encode(number).reduce((p, c) => (p + c) / p, 257) *
      39119) %
    360;
  const [r, g, b] = HSBToRGB(hash, s, bl).map((c) =>
    c.toString(16).padStart(2, '0')
  );
  return `#${r}${g}${b}`;
};
