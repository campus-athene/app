import React from 'react';
import { useHistory } from 'react-router';
import pageRoutes from '../../app/pageRoutes';
import PageFrame from '../../components/PageFrame';
import { UserNotLoggedInError } from '../../provider/camusnet';
import CampusNetLoginTeaser from '../auth/CampusNetLoginTeaser';
import { getCourseColor, useCoursesGroupedBySemester } from './coursesSlice';

const ListPage = () => {
  const history = useHistory();
  const semesters = useCoursesGroupedBySemester();

  if (semesters.error instanceof UserNotLoggedInError)
    return <CampusNetLoginTeaser title="Mein Studium" />;

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
                  history.push(pageRoutes.courseDetails(semesterId, number))
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
            {/* {semesterId === getRegSemester() && (
              <div
                className="flex px-4 py-2 font-semibold"
                onClick={() => history.push(pageRoutes.courseReg())}
              >
                <div style={{ flexGrow: '1' }}>Anmeldung</div>
                <FontAwesomeIcon className="self-center" icon={faAngleRight} />
              </div>
            )} */}
          </React.Fragment>
        ),
      )}
    </PageFrame>
  );
};

export default ListPage;
