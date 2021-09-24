import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { selectSyncState } from '../../redux/sync';
import PageFrame from '../common/PageFrame';
import { getRegSemester } from '../common/semesters';
import { getCourseColor, selectGroupedBySemester } from './coursesSlice';

const ListPage = () => {
  const history = useHistory();
  const semesters = useSelector(selectGroupedBySemester());
  return (
    <PageFrame title="Mein Studium" syncState={useSelector(selectSyncState())}>
      {semesters
        .sort((a, b) => b.id - a.id)
        .map(({ id: semesterId, name: semesterName, courses }, index) => (
          <ListGroup
            key={semesterId}
            style={{ marginLeft: '-15px', marginRight: '-15px' }}
            variant="flush"
          >
            <ListGroup.Item className="bg-light">{semesterName}</ListGroup.Item>
            {courses.map(({ code, name, instructor }) => (
              <ListGroup.Item
                key={code}
                action
                onClick={() =>
                  history.push(
                    `/courses/${semesterId}/${encodeURIComponent(code)}`
                  )
                }
              >
                <div
                  style={{
                    background: getCourseColor({ code }, 90, 70),
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
                  <span style={{ fontFamily: 'monospace' }}>{code}</span>&ensp;
                  {instructor}
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
              </ListGroup.Item>
            ))}
            {Number.parseInt(semesterId) === getRegSemester() && index === 0 && (
              <ListGroup.Item action onClick={() => history.push('/coursereg')}>
                <div style={{ display: 'flex', fontWeight: 'bold' }}>
                  <div style={{ flexGrow: '1' }}>Anmeldung</div>
                  <div>&gt;</div>
                </div>
              </ListGroup.Item>
            )}
          </ListGroup>
        ))}
    </PageFrame>
  );
};

export default ListPage;
