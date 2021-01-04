import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectGroupedBySemester } from './coursesSlice';
import PageFrame from '../common/PageFrame';

const CoursListPage = () => {
  const semesters = useSelector(selectGroupedBySemester());
  return (
    <PageFrame title="Veranstaltungen">
      {semesters.map(({ id: semesterId, name: semesterName, courses }) => (
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
        </ListGroup>
      ))}
    </PageFrame>
  );
};

export default CoursListPage;
