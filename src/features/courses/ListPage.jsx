import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { selectSyncState } from '../../redux/sync';
import PageFrame from '../common/PageFrame';
import { getCourseColor, selectGroupedBySemester } from './coursesSlice';

const ListPage = () => {
  const history = useHistory();
  const semesters = useSelector(selectGroupedBySemester());
  return (
    <PageFrame
      title="Mein Studium"
      syncState={useSelector(selectSyncState())}
    >
      {semesters.map(
        ({ id: semesterId, name: semesterName, courses }, index) => (
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
                    position: 'absolute',
                    inset: '0 auto 0 -10em',
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
            {/* Hardcoded to WiSe 2021/22. */}
            {semesterId === 15106000 && index === 0 && (
              <ListGroup.Item action onClick={() => history.push('/coursereg')}>
                <div style={{ display: 'flex', fontWeight: 'bold' }}>
                  <div style={{ flexGrow: '1' }}>Anmeldung</div>
                  <div>&gt;</div>
                </div>
              </ListGroup.Item>
            )}
          </ListGroup>
        )
      )}
    </PageFrame>
  );
};

export default ListPage;
