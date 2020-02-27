import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

const LoginPage = ({ exams }) => {
  const { id } = useParams();
  const history = useHistory();
  const exam = exams.find(e => e.id === id);

  if (!exam) {
    console.warn(`The requested exam '${id}' does not exist.`);
    history.goBack();
    return null;
  }
  
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Navbar.Brand onClick={() => history.goBack()} style={{ margin: '-0.5rem 0 -0.5rem -1rem', alignSelf: 'stretch', display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </Navbar.Brand>
        <Navbar.Brand>Klausurdetails</Navbar.Brand>
      </Navbar>
      <Container style={{ marginTop: '3.5em', overflow: 'scroll' }}>
        <h3 style={{ marginTop: '1rem' }}>{exam.courseName}</h3>
        <h4>{exam.examName}</h4>
        <p>
          K&uuml;rzel: {exam.code}<br />
          Datum: {exam.date}<br />
          { exam.grade && <span>Bewertung: {exam.gradeDesc} ({exam.grade})</span> }
        </p>
      </Container>
    </div>
    );
};

export default connect(
  state => ({
    exams: state.exams
  })
)(LoginPage);
