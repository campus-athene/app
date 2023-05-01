import * as cn from '@campus/campusnet-sdk';
import { useQuery } from '@tanstack/react-query';
import { useWithSession } from '.';
import { log } from '../../app/errorReporting';

export type Module = {
  number: string;
  name: string;
  lecturer: string;
  semester: cn.Semester;
  courses: cn.CourseMobile[];
};

type MappedModulesBySemesterAndCode = {
  [semester: number]: { [code: string]: Module };
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
      const modules = new Map<string, Module>();

      for (const c of courses) {
        if (c.smallGroup) continue;

        const number = c.module.number || c.number;
        const key = [c.semester, number].join();

        let m = modules.get(key);
        if (!m)
          modules.set(
            key,
            (m = {
              number,
              name: c.module.name || c.name,
              lecturer: courses[0].instructors,
              semester: c.semester,
              courses: [],
            })
          );

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

      type CourseItems = {
        [semester: number]: { [code: string]: Module };
      };
      const asObject: CourseItems = {};

      modules.forEach((c) => {
        (asObject[c.semester] || (asObject[c.semester] = {}))[c.number] = c;
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
