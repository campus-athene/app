import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ListGroup, Badge } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import PageFrame from '../common/PageFrame';
import convertGrade from './gradeConverter';
import { selectExamOffers, selectExamsGroupedBySemester } from './examsSlice';
import { Register, Unregister } from '../../icons';
import ExamRegModal from './ExamRegModal';
import { selectSyncState } from '../../redux/sync';

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
  const groupedExams = [
    { id: 'registration', display: 'Anmeldung', exams: useSelector(selectExamOffers) },
    ...useSelector(selectExamsGroupedBySemester)
  ];
  const [selectedExam, setSelectedExam] = useState();

  return (
    <PageFrame title="Prüfungen" syncState={useSelector(selectSyncState())}>
      { groupedExams.map(({ id, display, exams }) =>
        <ListGroup key={id} style={{ marginLeft: '-15px', marginRight: '-15px' }} variant="flush">
          <ListGroup.Item className='bg-light' style={clip}>
            {display}
          </ListGroup.Item>
          {exams.map(exam => ({ exam })).map(({ exam, exam: { id, courseName, examName, date, status, grade } }) =>
            <ListGroup.Item
              key={id} action
              style={{ display: 'flex', flexFlow: 'row', alignItems: 'center' }}
              onClick={() => history.push(`/exams/${id}`)}>
              <div style={{ flexGrow: 1, overflow: 'hidden' }}>
                <div style={Object.assign({}, ellipsis, { fontSize: '1.25rem' })}>{courseName}</div>
                <div style={ellipsis}>{examName}</div>
                <div>
                  {grade ?
                    <Badge pill variant={convertGrade(grade).color}>{convertGrade(grade).desc} ({grade})</Badge> :
                    <>{date}</>
                  }
                </div>
              </div>
              {(status === 'register' || status === 'unregister') &&
                <div style={{
                  flexShrink: 0, margin: '-0.75rem -1.25rem -0.75rem 0', width: '3.5rem', padding: '0 1.25rem 0 0.5rem',
                  alignSelf: 'stretch', display: 'grid', alignContent: 'center'
                }} onClick={(e) => { setSelectedExam(exam); e.stopPropagation(); }}>
                  {status === 'register' &&
                    <Register style={{ fill: '#28a745' }} />}
                  {status === 'unregister' &&
                    <Unregister style={{ fill: '#dc3545' }} />}
                </div>}
            </ListGroup.Item>
          )}
        </ListGroup>
      )}
      {selectedExam &&
        <ExamRegModal exam={selectedExam} closeCallback={() => setSelectedExam(null)} />}
    </PageFrame>
  );
}

export default ExamListPage;
