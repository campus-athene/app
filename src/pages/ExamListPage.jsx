import React from 'react';
import { Navbar, Container, ListGroup, Button, Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../redux/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

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

const ExamListPage = ({ allExams, logout }) => {
  const history = useHistory();
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Navbar.Brand onClick={() => history.goBack()} style={{ margin: '-0.5rem 0 -0.5rem -1rem', alignSelf: 'stretch', display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </Navbar.Brand>
        <Navbar.Brand>Klausuren</Navbar.Brand>
      </Navbar>
      <Container style={{ marginTop: '3.5em', overflow: 'scroll' }}>
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
                      <i>Offen</i>
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
        <Button variant="danger" block style={{ marginTop: '1rem', marginBottom: '1rem' }} onClick={logout}>Abmelden</Button>
      </Container>
    </div>
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
  ).sort((a, b) => b - a);
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
  state => ({ allExams: state.exams }),
  { logout }
)(ExamListPage);
