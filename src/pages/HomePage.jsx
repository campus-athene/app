import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { Container, Navbar } from 'react-bootstrap';

const HomePage = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Navbar.Brand style={{ margin: '-0.5rem 0 -0.5rem -1rem', alignSelf: 'stretch', display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </Navbar.Brand>
        <Navbar.Brand>Campus</Navbar.Brand>
      </Navbar>
      <Container style={{ marginTop: '3.5em', overflow: 'scroll', paddingTop: '1em' }}>
        <h4><Link to="classreg">Veranstaltungsanmeldung</Link></h4>
        <h4><Link to="exams">Klausurergebnisse</Link></h4>
        <h4><Link to="maps">Campuskarten</Link></h4>
      </Container>
    </div>
  );
};

export default HomePage;
