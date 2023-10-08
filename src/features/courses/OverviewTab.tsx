import {
  CourseMobile,
  CourseOffer,
  descriptions as semesterDescs,
  ModuleOffer,
} from '@campus/campusnet-sdk';
import {
  Skeleton as MuiSkeleton,
  SkeletonProps,
  SkeletonTypeMap,
} from '@mui/material';
import { OverridableComponent } from '@mui/types';
import { Fragment } from 'react';
import sanitizeHtml from 'sanitize-html';
import { twMerge } from 'tailwind-merge';
import {
  Module,
  useCourseDetails,
  useCourseProps,
} from '../../provider/camusnet/courses';
import './CourseDetail.css';

const Skeleton: OverridableComponent<SkeletonTypeMap<{}, 'span'>> = (
  props: SkeletonProps,
) => (
  <MuiSkeleton
    animation="wave"
    {...props}
    style={{ display: 'inline-block', ...props.style }}
  />
);

const InfoBlock = ({
  title,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { title: string }) => (
  <div {...props} className={twMerge('mb-2', props.className)}>
    <span style={{ color: 'gray' }}>{title}: </span>
    {props.children}
  </div>
);

const CourseDetails = (params: { course: CourseMobile | CourseOffer }) => {
  const course = params.course;
  const details = useCourseDetails(params.course.courseId);
  const props = useCourseProps(params.course.courseId, params.course.groupId);

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
      <InfoBlock title="Raum">
        {props.data ? (
          props.data.appointments
            .flatMap((a) => a.rooms)
            .filter((v, i, a) => a.indexOf(v) === i)
            .map((r, i) => (
              <Fragment key={r}>
                {i !== 0 && <span style={{ color: 'gray' }}> | </span>}
                <span className="inline-block">{r}</span>
              </Fragment>
            ))
        ) : props.isLoading ? (
          <Skeleton />
        ) : (
          <i>Fehler</i>
        )}
      </InfoBlock>
      <InfoBlock title="Wochenstunden">
        {props.data ? (
          props.data.hoursPerWeek
        ) : props.isLoading ? (
          <Skeleton />
        ) : (
          <i>Fehler</i>
        )}
      </InfoBlock>
      <InfoBlock title="Unterrichtssprache">
        {props.data ? (
          props.data.langDesc
        ) : props.isLoading ? (
          <Skeleton />
        ) : (
          <i>Fehler</i>
        )}
      </InfoBlock>
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
            <InfoBlock key={d.name} title={d.name}>
              {
                <div className="-mb-2 inline-block">
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
              }
            </InfoBlock>
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
      <InfoBlock title="Modulnummer">
        <span style={{ fontFamily: 'monospace' }}>{module.number}</span>
      </InfoBlock>
      <InfoBlock title="Modulname">{module.name}</InfoBlock>
      <InfoBlock title="Lehrende">{module.lecturer}</InfoBlock>
      {'semester' in module && (
        <InfoBlock title="Semester">{semesterDescs[module.semester]}</InfoBlock>
      )}
      {module.courses.map((c) => (
        <CourseDetails key={c.courseId} course={c} />
      ))}
    </div>
  );
};

export default OverviewTab;
