import { useState } from 'react';
import { Button } from 'react-bootstrap';
import CourseRegModal from './CourseRegModal';

const OverviewTab = ({ module }) => {
  const registration = module.status;

  const [regDlgOpen, setRegDlgOpen] = useState();

  return (
    <div style={{ padding: '0.8em 1em' }}>
      <p>
        Modulnummer:{' '}
        <span style={{ fontFamily: 'monospace' }}>{module.code}</span>
        <br />
        Modulname: {module.name}
        <br />
        Lehrende: {module.instructor}
        {module.semester && (
          <>
            <br />
            Semester: {module.semester}
          </>
        )}
      </p>
      <p>
        <div>
          <u>Bestehend aus:</u>
        </div>
        <div
          style={{
            columnGap: '0.25em',
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
          }}
        >
          {module.courses.map((course) => (
            <>
              <div>
                <span style={{ fontFamily: 'monospace' }}>{course.code}</span>{' '}
              </div>
              <div>
                {course.name}{' '}
                {
                  /* category is not provided for course offers. */
                  course.category && (
                    <span style={{ color: 'gray' }}>({course.category})</span>
                  )
                }
              </div>
            </>
          ))}
        </div>
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
          {regDlgOpen && (
            <CourseRegModal
              offer={module}
              onClose={() => setRegDlgOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default OverviewTab;
