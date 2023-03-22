import * as cn from '@campus/campusnet-sdk';
import { useQuery } from '@tanstack/react-query';
import { useWithSession } from '.';

const queryKey = ['campusnet', 'exams'];

const useExamsWithSelector = <TData>(
  select: (data: cn.ExamMobile[]) => TData
) => {
  const queryFn = useWithSession(cn.examsMobile);

  return useQuery<cn.ExamMobile[], unknown, TData, string[]>({
    queryKey,
    queryFn,
    select,
  });
};

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

export const useExamGrade = (id: number) => {
  const queryFn = useWithSession(cn.examGrades);

  return useQuery({
    queryKey: [...queryKey, 'grades', id],
    queryFn: () => queryFn(id),
  });
};
