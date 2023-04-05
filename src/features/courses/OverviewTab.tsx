import {
  Skeleton as MuiSkeleton,
  SkeletonProps,
  SkeletonTypeMap,
} from '@mui/material';
import { OverridableComponent } from '@mui/types';
import { useState } from 'react';
import sanitizeHtml from 'sanitize-html';
import Button from '../../components/Button';
import { useCourseDetails } from '../../provider/camusnet/courses';
import {
  Course,
  CourseOffer,
  Module,
  ModuleOffer,
} from '../../provider/tucan/apiTypes';
import { descriptions as semesterDescs } from '../../provider/tucan/semesters';
import './CourseDetail.css';
import CourseRegModal from './CourseRegModal';

const Skeleton: OverridableComponent<SkeletonTypeMap<{}, 'span'>> = (
  props: SkeletonProps
) => (
  <MuiSkeleton
    animation="wave"
    {...props}
    style={{ display: 'inline-block', ...props.style }}
  />
);

const CourseDetails = (params: { course: Course | CourseOffer }) => {
  const course = params.course;
  const details = useCourseDetails(params.course.id);

  return (
    <>
      <p style={{ marginBottom: 0, marginTop: '3em' }}>
        <code>{course.code}</code>
      </p>
      <p style={{ marginBottom: 0 }}>
        <b>{course.name}</b>
      </p>
      <p style={{ marginBottom: '1em' }}>{course.instructor}</p>
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
  const registration = 'status' in module;

  const [regDlgOpen, setRegDlgOpen] = useState(false);

  return (
    <div
      style={{ fontSize: '0.8em', padding: '0.8em 1em', overflowY: 'scroll' }}
    >
      <p>
        Modulnummer:{' '}
        <span style={{ fontFamily: 'monospace' }}>{module.code}</span>
        <br />
        Modulname: {module.name}
        <br />
        Lehrende: {module.instructor}
        {'semester' in module && (
          <>
            <br />
            Semester: {semesterDescs[module.semester]}
          </>
        )}
      </p>
      {registration && (
        <>
          <p>
            {module.status === 'register' && (
              <Button onClick={() => setRegDlgOpen(true)}>Anmelden</Button>
            )}
            {module.status === 'edit' && (
              <Button onClick={() => setRegDlgOpen(true)}>Ummelden</Button>
            )}
            {module.status === 'unregister' && (
              <Button onClick={() => setRegDlgOpen(true)}>Abmelden</Button>
            )}
          </p>
        </>
      )}
      {module.courses.map((c) => (
        <CourseDetails key={c.id} course={c} />
      ))}
      {registration && regDlgOpen && (
        <CourseRegModal offer={module} onClose={() => setRegDlgOpen(false)} />
      )}
    </div>
  );
};

export default OverviewTab;
