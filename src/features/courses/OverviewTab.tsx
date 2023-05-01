import { CourseMobile, CourseOffer, ModuleOffer } from '@campus/campusnet-sdk';
import {
  Skeleton as MuiSkeleton,
  SkeletonProps,
  SkeletonTypeMap,
} from '@mui/material';
import { OverridableComponent } from '@mui/types';
import sanitizeHtml from 'sanitize-html';
import { Module, useCourseDetails } from '../../provider/camusnet/courses';
import { descriptions as semesterDescs } from '../../provider/tucan/semesters';
import './CourseDetail.css';

const Skeleton: OverridableComponent<SkeletonTypeMap<{}, 'span'>> = (
  props: SkeletonProps
) => (
  <MuiSkeleton
    animation="wave"
    {...props}
    style={{ display: 'inline-block', ...props.style }}
  />
);

const CourseDetails = (params: { course: CourseMobile | CourseOffer }) => {
  const course = params.course;
  const details = useCourseDetails(params.course.courseId);

  return (
    <>
      <p style={{ marginBottom: 0, marginTop: '3em' }}>
        <code>{course.number}</code>
      </p>
      <p style={{ marginBottom: 0 }}>
        <b>{course.name}</b>
      </p>
      <p style={{ marginBottom: '1em' }}>
        {'lecturer' in course ? course.lecturer : course.instructors}
      </p>
      {details.isLoading ? (
        <p>
          <Skeleton width={210} /> <Skeleton width={120} />{' '}
          <Skeleton width={240} /> <Skeleton width={120} />{' '}
          <Skeleton width={150} /> <Skeleton width={150} />
        </p>
      ) : (
        details.data
          ?.filter((d) => d.value)
          .map((d) => (
            <div
              className="courseDetail"
              key={d.name}
              style={{ marginBottom: '0.5em' }}
            >
              <span style={{ color: 'gray' }}>{d.name}: </span>
              {d.value
                .replaceAll(/<br\s*\/>(?!\s*<br \s*\/>)/g, '')
                .split(/\r?\n(?:\s*\r?\n)+/)
                .map((v, i) => (
                  <p
                    key={i}
                    className="mb-2 inline-block"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(v) }}
                    style={{
                      overflowWrap: 'break-word',
                      userSelect: 'text',
                      WebkitUserSelect: 'text',
                    }}
                  />
                ))}
            </div>
          ))
      )}
    </>
  );
};

const OverviewTab = ({ module }: { module: Module | ModuleOffer }) => {
  return (
    <div
      style={{ fontSize: '0.8em', padding: '0.8em 1em', overflowY: 'scroll' }}
    >
      <p>
        Modulnummer:{' '}
        <span style={{ fontFamily: 'monospace' }}>{module.number}</span>
        <br />
        Modulname: {module.name}
        <br />
        Lehrende: {module.lecturer}
        {'semester' in module && (
          <>
            <br />
            Semester: {semesterDescs[module.semester]}
          </>
        )}
      </p>
      {module.courses.map((c) => (
        <CourseDetails key={c.courseId} course={c} />
      ))}
    </div>
  );
};

export default OverviewTab;
