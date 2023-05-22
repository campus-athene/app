import * as cn from '@campus/campusnet-sdk';
import { useCNQuery } from '.';

const queryKey = ['exams'];

const useExamsWithSelector = <TData>(
  select: (data: cn.ExamMobile[]) => TData
) =>
  useCNQuery<cn.ExamMobile[], unknown, TData, string[]>({
    queryKey,
    queryFn: cn.examsMobile,
    select,
  });

export const useExam = (id: number) =>
  useExamsWithSelector((exams) => exams.find((e) => e.examId === id));

export const useExams = () => useExamsWithSelector((exams) => exams);

export const useExamsGroupedBySemester = () =>
  useExamsWithSelector((exams) =>
    Object.values(
      exams.reduce((semesters, exam) => {
        (
          semesters[exam.semester] ||
          (semesters[exam.semester] = { id: exam.semester, exams: [] })
        ).exams.push(exam);
        return semesters;
      }, {} as { id: cn.Semester; exams: cn.ExamMobile[] }[])
    )
  );

export const useExamGrade = (id: number) =>
  useCNQuery({
    queryKey: [...queryKey, 'grades', id],
    queryFn: (session) => cn.examGrades(session, id),
  });
