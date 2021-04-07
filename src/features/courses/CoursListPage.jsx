import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectGroupedBySemester } from './coursesSlice';
import PageFrame from '../common/PageFrame';
import { useHistory } from 'react-router';
import { selectSyncState } from '../../redux/sync';

const CoursListPage = () => {
  const history = useHistory();
  const semesters = useSelector(selectGroupedBySemester());
  return (
    <PageFrame title="Veranstaltungen" syncState={useSelector(selectSyncState())}>
      {semesters.map(({ id: semesterId, name: semesterName, courses }, index) => (
        <ListGroup
          key={semesterId}
          style={{ marginLeft: '-15px', marginRight: '-15px' }}
          variant="flush"
        >
          <ListGroup.Item className="bg-light">{semesterName}</ListGroup.Item>
          {courses.map(({ code, name, instructor }) => (
            <ListGroup.Item key={code}>
              <div style={{ fontSize: '1.25rem' }}>{name}</div>
              <div
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <i>{code}</i>&ensp;{instructor}
              </div>
            </ListGroup.Item>
          ))}
          {/* It would be better if we check for the current registration semester. */}
          {index === 0 && (
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

export default CoursListPage;
