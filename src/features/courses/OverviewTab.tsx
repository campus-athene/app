import { useState } from 'react';
import { Button, Placeholder } from 'react-bootstrap';
import sanitizeHtml from 'sanitize-html';
import {
  Course,
  CourseOffer,
  Module,
  ModuleOffer,
} from '../../provider/tucan/apiTypes';
import { descriptions as semesterDescs } from '../../provider/tucan/semesters';
import './CourseDetail.css';
import CourseRegModal from './CourseRegModal';
import { useDetails } from './coursesSlice';

const CourseDetails = (params: { course: Course | CourseOffer }) => {
  const course = params.course;
  const details = useDetails(params.course.id);

  return (
    <>
      <p style={{ marginBottom: 0, marginTop: '3em' }}>
        <code>{course.code}</code>
      </p>
      <p style={{ marginBottom: 0 }}>
        <b>{course.name}</b>
      </p>
      <p style={{ marginBottom: '1em' }}>{course.instructor}</p>
      {details.loading ? (
        <Placeholder animation="glow">
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={8} />{' '}
          <Placeholder xs={4} /> <Placeholder xs={5} /> <Placeholder xs={5} />
        </Placeholder>
      ) : (
        details.result?.details
          .filter((d) => d.value)
          .map((d) => (
            <div
              className="courseDetail"
              key={d.title}
              style={{ marginBottom: '0.5em' }}
            >
              <span style={{ color: 'gray' }}>{d.title}: </span>
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
              <Button variant="warning" onClick={() => setRegDlgOpen(true)}>
                Anmelden
              </Button>
            )}
            {module.status === 'edit' && (
              <Button variant="primary" onClick={() => setRegDlgOpen(true)}>
                Ummelden
              </Button>
            )}
            {module.status === 'unregister' && (
              <Button variant="danger" onClick={() => setRegDlgOpen(true)}>
                Abmelden
              </Button>
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
