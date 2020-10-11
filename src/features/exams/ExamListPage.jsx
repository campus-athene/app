import React from 'react';
import { useSelector } from 'react-redux';
import { ListGroup, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { selectIsLoaded } from '../../redux/sync';
import PageFrame from '../common/PageFrame';
import convertGrade from './gradeConverter';
import { selectExamsGroupedBySemester } from './examsSlice';

const clip = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'clip'
};

const ellipsis = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

const ExamListPage = () => {
  const history = useHistory();
  const isLoading = !useSelector(selectIsLoaded);
  const groupedExams = useSelector(selectExamsGroupedBySemester);
  return (
    <PageFrame title="Klausuren">
      { groupedExams.map(({ id, display, exams }) =>
        <ListGroup key={id} style={{ marginLeft: '-15px', marginRight: '-15px' }} variant="flush">
          <ListGroup.Item className='bg-light' style={clip}>
            { display }
          </ListGroup.Item>
          { exams.map(({ id, courseName, examName, status, grade }) =>
            <ListGroup.Item
              key={id} action
              style={{ display: 'flex', flexFlow: 'row', alignItems: 'center' }}
              onClick={() => history.push(`/exams/${id}`)}>
              <div style={{ flexGrow: 1, overflow: 'hidden' }}>
                <div style={Object.assign({}, ellipsis, { fontSize: '1.25rem' })}>{courseName}</div>
                <div style={ellipsis}>{examName}</div>
                <div>
                  { grade ?
                    <Badge pill variant={convertGrade(grade).color}>{convertGrade(grade).desc} ({grade})</Badge> :
                    <i>{ isLoading ? "Lädt..." : status === 'register' ? "Anmeldung geöffnet" : "Angemeldet" }</i>
                  }
                </div>
              </div>
              <div style={{ flexShrink: 0, marginRight: '-1.25rem', width: '2.25rem', paddingRight: '0.5rem', textAlign: 'center', color: 'gray' }}>
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
            </ListGroup.Item>
          )}
        </ListGroup>
      )}
    </PageFrame>
  );
}

export default ExamListPage;
