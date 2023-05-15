import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router';
import PageFrame from '../../components/PageFrame';
import { getRegSemester } from '../../provider/camusnet/semesters';
import { getCourseColor, useCoursesGroupedBySemester } from './coursesSlice';

const ListPage = () => {
  const navigate = useNavigate();
  const semesters = useCoursesGroupedBySemester();
  return (
    <PageFrame
      className="divide-y"
      title="Mein Studium"
      syncState={{
        isLoading: semesters.isLoading,
        isOffline: semesters.isError,
      }}
    >
      {semesters.data?.map(
        ({ id: semesterId, name: semesterName, courses }) => (
          <React.Fragment key={semesterId}>
            <div className="bg-neutral-100 px-4 py-1 text-sm font-medium">
              {semesterName}
            </div>
            {courses.map(({ number, name, lecturer }) => (
              <div
                className="relative px-4 py-2"
                key={number}
                onClick={() =>
                  navigate(
                    `/courses/${semesterId}/${encodeURIComponent(number)}`
                  )
                }
              >
                <div
                  style={{
                    background: getCourseColor({ number }, 90, 70),
                    bottom: '0',
                    left: '-10em',
                    position: 'absolute',
                    top: '0',
                    width: '10.5em',
                  }}
                />
                <div
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <span style={{ fontFamily: 'monospace' }}>{number}</span>
                  &ensp;
                  {lecturer}
                </div>
                <div
                  style={{
                    fontSize: '1.25rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {name}
                </div>
              </div>
            ))}
            {semesterId === getRegSemester() && (
              <div
                className="flex px-4 py-2 font-semibold"
                onClick={() => navigate('/coursereg')}
              >
                <div style={{ flexGrow: '1' }}>Anmeldung</div>
                <FontAwesomeIcon className="self-center" icon={faAngleRight} />
              </div>
            )}
          </React.Fragment>
        )
      )}
    </PageFrame>
  );
};

export default ListPage;
