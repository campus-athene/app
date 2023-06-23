import { CourseMobile, CourseOffer, ModuleOffer } from '@campus/campusnet-sdk';
import { Skeleton } from '@mui/material';
import { Module, useCourseProps } from '../../provider/camusnet/courses';

const AppointmentsTab = ({ module }: { module: Module | ModuleOffer }) => {
  return (
    <div className="overflow-y-scroll px-4 pt-6">
      {module.courses.map((c) => (
        <CourseApps key={c.courseId} course={c} />
      ))}
    </div>
  );
};

const CourseApps = (params: { course: CourseMobile | CourseOffer }) => {
  const course = params.course;

  const props = useCourseProps(params.course.courseId, params.course.groupId);

  return (
    <>
      <div>
        <code className="text-xs ">{course.number}</code>
      </div>
      <div className="text-sm font-semibold">{course.name}</div>
      <div className="mb-4 text-sm">
        {
          'lecturer' in course ? course.lecturer : course.instructors
          // Workaround. course should always have lecturer.
        }
      </div>
      {props.isLoading ? (
        <div>
          <Skeleton width={150} />
          <Skeleton width={60} style={{ marginBottom: '1rem' }} />
          <Skeleton width={150} />
          <Skeleton width={60} style={{ marginBottom: '1rem' }} />
          <Skeleton width={150} />
          <Skeleton width={60} />
        </div>
      ) : null}
      {!props.isLoading &&
        props.data?.appointments.map((a, i) => (
          <div key={i} className="mb-2 text-xs">
            {a.dateStr} {a.timeFromStr} &ndash; {a.timeToStr}
            <br />
            <span className="text-gray-500">{a.rooms.join(' | ')}</span>
          </div>
        ))}
      <div className="mb-16" />
    </>
  );
};

export default AppointmentsTab;
