import React from 'react';
import { ListGroup, Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import PageFrame from '../common/PageFrame';
import convertGrade from './gradeConverter';

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

const ExamListPage = ({ isLoading, allExams }) => {
  const history = useHistory();
  return (
    <PageFrame title="Klausuren">
      { Object.values(groupExams(allExams)).map(({ id, display, exams }) =>
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

const groupExams = (exams) => {
  const desc = {
    // Yes, the first two are irregular.
    15024000: "Wintersemester 2016 / 2017",
		15025000: "Sommersemester 2017",
    15026000: "Wintersemester 2017 / 2018",
		15036000: "Sommersemester 2018",
		15046000: "Wintersemester 2018 / 2019",
		15056000: "Sommersemester 2019",
		15066000: "Wintersemester 2019 / 2020",
    15076000: "Sommersemester 2020",
    15086000: "Wintersemester 2020 / 2021",
    15096000: "Sommersemester 2021",
    15106000: "Wintersemester 2021 / 2022",
    15116000: "Sommersemester 2022",
    15126000: "Wintersemester 2022 / 2023",
    15136000: "Sommersemester 2023",
    15146000: "Wintersemester 2023 / 2024",
    15156000: "Sommersemester 2024",
  }
  return Object.values(
    exams.reduce((groups, exam) => {
      (
        groups[exam.semester] = groups[exam.semester] || {
          id: exam.semester,
          display: desc[exam.semester] || "Sonstige",
          exams: []
        }
      ).exams.push(exam);
      return groups;
    }, {})
  ).sort((a, b) => b.id - a.id);
}

export default connect(
  state => ({
    isLoading: state.sync.isLoading,
    allExams: state.exams
  })
)(ExamListPage);
