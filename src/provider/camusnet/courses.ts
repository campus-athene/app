import * as cn from '@campus/campusnet-sdk';
import { useQuery } from '@tanstack/react-query';
import { useWithSession } from '.';
import { log } from '../../app/errorReporting';

type MappedCourse = {
  id: number;
  groupId: number;
  code: string;
  name: string;
  instructor: string;
};

type MappedModule = {
  code: string;
  name: string;
  instructor: string;
  semester: cn.Semester;
  courses: MappedCourse[];
};

type MappedModulesBySemesterAndCode = {
  [semester: number]: { [code: string]: MappedModule };
};

const queryKey = ['campusnet', 'courses'];

export const useCoursesWithSelectorFromGroupedByModule = <TData>(
  select: (data: MappedModulesBySemesterAndCode) => TData,
  enabled = true
) => {
  const queryFn = useWithSession(cn.coursesMobile);

  return useQuery({
    enabled,
    queryKey,
    queryFn,
    select: (courses) => {
      type module = {
        code: string;
        semester: cn.Semester;
        courses: cn.CourseMobile[];
      };
      const modules = new Map<string, module>();

      for (const c of courses) {
        if (c.smallGroup) continue;

        const code = c.module.number || c.number;
        const key = [c.semester, code].join();

        let m = modules.get(key);
        if (!m)
          modules.set(key, (m = { code, semester: c.semester, courses: [] }));

        m.courses.push(c);
      }

      modules.forEach(
        // Check that all courses in one module have the same name.
        ({ courses: cs }) =>
          cs.slice(1).some((c) => c.module.name !== cs[0].module.name) &&
          log('warning', `Courses for module have mismatching names.`, {
            moduleNumber: cs[0].module.number,
          })
      );

      const mapped: MappedModule[] = Array.from(
        modules.values(),
        ({ code, semester, courses: cs }) => ({
          code,
          name: cs[0].module.name || cs[0].name,
          instructor: cs[0].instructors,
          semester,
          courses: cs.map((c) => ({
            id: c.courseId,
            groupId: c.groupId,
            code: c.number,
            name: c.name,
            instructor: c.instructors,
          })),
        })
      );

      type CourseItems = {
        [semester: number]: { [code: string]: MappedModule };
      };
      const asObject: CourseItems = {};

      mapped.forEach((c) => {
        (asObject[c.semester] || (asObject[c.semester] = {}))[c.code] = c;
      });

      return select(asObject);
    },
  });
};

export const useCourseDetails = (id: number) => {
  const queryFn = useWithSession(cn.courseDetails);

  return useQuery({
    queryKey: [...queryKey, 'details', id],
    queryFn: () => queryFn(id),
  });
};

export const useCourseOffers = (major = 0, area = 0, list = 0) => {
  const queryFn = useWithSession(cn.courseOffers);

  // If major is 0, data will be chached for the value 0. This behaviour
  // should be changed to cache for the data for the actual major.
  return useQuery({
    queryKey: ['campusnet', 'courseOffers', major, area, list],
    queryFn: () => queryFn(major, area, list),
  });
};
