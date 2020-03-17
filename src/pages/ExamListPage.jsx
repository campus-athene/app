import React from 'react';
import { ListGroup, Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import PageFrame from '../components/PageFrame';

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
        <ListGroup key={id} style={{ marginBottom: '1rem', marginLeft: '-15px', marginRight: '-15px' }} variant="flush">
          <ListGroup.Item className='bg-light' style={clip}>
            { display }
          </ListGroup.Item>
          { exams.map(({ id, courseName, examName, grade, gradeDesc }) =>
            <ListGroup.Item
              key={id} action
              style={{ display: 'flex', flexFlow: 'row', alignItems: 'center' }}
              onClick={() => history.push(`/exams/${id}`)}>
              <div style={{ flexGrow: 1, overflow: 'hidden' }}>
                <h5 style={ Object.assign({}, ellipsis, { marginBottom: '0', paddingBottom: '0.75rem' }) }>{courseName}</h5>
                <h6 style={ Object.assign({}, ellipsis, { marginBottom: '-0.5rem', paddingBottom: '0.5rem'}) }>{examName}</h6>
                <p style={{ marginBottom: '0' }}>
                  { grade ?
                    <Badge pill variant={mapGradeToVariant(grade)}>{gradeDesc} ({grade})</Badge> :
                    <i>{ isLoading ? "Lädt..." : "Offen" }</i>
                  }
                </p>
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
    '000000015026000': "Wintersemester 2017 / 2018",
		'000000015036000': "Sommersemester 2018",
		'000000015046000': "Wintersemester 2018 / 2019",
		'000000015056000': "Sommersemester 2019",
		'000000015066000': "Wintersemester 2019 / 2020"
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

const mapGradeToVariant = (grade) => {
  switch (grade) {
    case 'b':
    case '1,0':
    case '1,3':
    case '1,7':
    case '2,0':
    case '2,3':
    case '2,7':
      return 'success';
    case '3,0':
    case '3,3':
    case '3,7':
    case '4,0':
      return 'warning';
    case 'nb':
    case '5,0':
      return 'danger';
    default:
      return 'info';
  }
}

export default connect(
  state => ({
    isLoading: state.sync.isLoading,
    allExams: state.exams
  })
)(ExamListPage);
