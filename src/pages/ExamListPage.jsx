import React from 'react';
import { Navbar, Container, Card, ListGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../redux/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

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

const ExamListPage = ({ allExams, logout }) => (
  <div style={{ display: 'flex', height: '100vh' }}>
    <Navbar bg="dark" variant="dark" fixed="top">
      <Navbar.Brand className="">
        <FontAwesomeIcon icon={faAngleLeft} />
      </Navbar.Brand>
      <Navbar.Brand>Klausurergebnisse</Navbar.Brand>
    </Navbar>
    <Container style={{ marginTop: '3.5em', overflow: 'scroll' }}>
      { Object.values(groupExams(allExams)).map(({ id, display, exams }) =>
        <Card key={id} style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <Card.Header style={clip}>
            { display }
          </Card.Header>
          <ListGroup variant="flush">
            { exams.map(exam =>
              <ListGroup.Item key={exam.id} style={{ display: 'flex', flexFlow: 'row', alignItems: 'center' }}>
                <div style={{ flexGrow: 1, overflow: 'hidden' }}>
                  <Card.Title style={ellipsis}>{exam.courseName}</Card.Title>
                  <Card.Subtitle style={ellipsis}>{exam.examName}</Card.Subtitle>
                  <Card.Text>{exam.gradeDesc} ({exam.grade})</Card.Text>
                </div>
                <div style={{ flexShrink: 0, marginRight: '-1.25rem', width: '2.25rem', paddingRight: '0.5rem', textAlign: 'center', color: 'gray' }}>
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Card>
      )}
      <Button variant="danger" block style={{ marginTop: '1rem', marginBottom: '1rem' }} onClick={logout}>Abmelden</Button>
    </Container>
  </div>
  );

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

export default connect(
  state => ({ allExams: state.exams }),
  { logout }
)(ExamListPage);
