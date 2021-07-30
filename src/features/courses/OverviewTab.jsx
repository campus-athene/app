const OverviewTab = ({ module }) => {
  return (
    <div style={{ padding: '0.8em 1em' }}>
      <p>
        Modulnummer:{' '}
        <span style={{ fontFamily: 'monospace' }}>{module.code}</span>
        <br />
        Modulname: {module.name}
        <br />
        Lehrende: {module.instructor}
        <br />
        Semester: {module.semester}
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
                <span style={{ fontFamily: 'monospace' }}>
                  {course.courseNumber}
                </span>{' '}
              </div>
              <div>
                {course.courseName}{' '}
                <span style={{ color: 'gray' }}>({course.eventCategory})</span>
              </div>
            </>
          ))}
        </div>
      </p>
    </div>
  );
};

export default OverviewTab;
