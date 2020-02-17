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

const LoginPage = ({logout}) => (
  <div style={{ display: 'flex', height: '100vh' }}>
    <Navbar bg="dark" variant="dark" fixed="top">
      <Navbar.Brand className="">
        <FontAwesomeIcon icon={faAngleLeft} />
      </Navbar.Brand>
      <Navbar.Brand>Klausurergebnisse</Navbar.Brand>
    </Navbar>
    <Container style={{ marginTop: '3.5em', overflow: 'scroll' }}>
      <Card style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <Card.Header style={clip}>
          Wintersemester 2019 / 2020
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item style={{ display: 'flex', flexFlow: 'row', alignItems: 'center' }}>
            <div style={{ flexGrow: 1, overflow: 'hidden' }}>
              <Card.Title style={ellipsis}>HIGHEST Ringvorlesung „Digitales Business und Start-ups“</Card.Title>
              <Card.Subtitle style={ellipsis}>Studienleistung 100%</Card.Subtitle>
              <Card.Text>nicht bestanden (nb)</Card.Text>
            </div>
            <div style={{ flexShrink: 0, marginRight: '-1.25rem', width: '2.25rem', paddingRight: '0.5rem', textAlign: 'center', color: 'gray' }}>
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
          </ListGroup.Item>
          <ListGroup.Item style={{ display: 'flex', flexFlow: 'row', alignItems: 'center' }}>
            <div style={{ flexGrow: 1, overflow: 'hidden' }}>
              <Card.Title style={ellipsis}>Chinesisch I/II c</Card.Title>
              <Card.Subtitle style={ellipsis}>Studienleistung - nur Teilnahmeschein 100%</Card.Subtitle>
              <Card.Text>bestanden (b)</Card.Text>
            </div>
            <div style={{ flexShrink: 0, marginRight: '-1.25rem', width: '2.25rem', paddingRight: '0.5rem', textAlign: 'center', color: 'gray' }}>
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
          </ListGroup.Item>
          <ListGroup.Item style={{ display: 'flex', flexFlow: 'row', alignItems: 'center' }}>
            <div style={{ flexGrow: 1, overflow: 'hidden' }}>
              <Card.Title style={ellipsis}>IT-Projektmanagement (Vorlesung)</Card.Title>
              <Card.Subtitle style={ellipsis}>Fachprüfung (IT-Projektmanagement) 3</Card.Subtitle>
              <Card.Text>gut (2,3)</Card.Text>
            </div>
            <div style={{ flexShrink: 0, marginRight: '-1.25rem', width: '2.25rem', paddingRight: '0.5rem', textAlign: 'center', color: 'gray' }}>
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
          </ListGroup.Item>
          <ListGroup.Item style={{ display: 'flex', flexFlow: 'row', alignItems: 'center' }}>
            <div style={{ flexGrow: 1, overflow: 'hidden' }}>
              <Card.Title style={ellipsis}>HIGHEST Ringvorlesung „Digitales Business und Start-ups“</Card.Title>
              <Card.Subtitle style={ellipsis}>Studienleistung 100%</Card.Subtitle>
              <Card.Text>nicht bestanden (nb)</Card.Text>
            </div>
            <div style={{ flexShrink: 0, marginRight: '-1.25rem', width: '2.25rem', paddingRight: '0.5rem', textAlign: 'center', color: 'gray' }}>
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
          </ListGroup.Item>
          <ListGroup.Item style={{ display: 'flex', flexFlow: 'row', alignItems: 'center' }}>
            <div style={{ flexGrow: 1, overflow: 'hidden' }}>
              <Card.Title style={ellipsis}>Chinesisch I/II c</Card.Title>
              <Card.Subtitle style={ellipsis}>Studienleistung - nur Teilnahmeschein 100%</Card.Subtitle>
              <Card.Text>bestanden (b)</Card.Text>
            </div>
            <div style={{ flexShrink: 0, marginRight: '-1.25rem', width: '2.25rem', paddingRight: '0.5rem', textAlign: 'center', color: 'gray' }}>
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
          </ListGroup.Item>
          <ListGroup.Item style={{ display: 'flex', flexFlow: 'row', alignItems: 'center' }}>
            <div style={{ flexGrow: 1, overflow: 'hidden' }}>
              <Card.Title style={ellipsis}>IT-Projektmanagement (Vorlesung)</Card.Title>
              <Card.Subtitle style={ellipsis}>Fachprüfung (IT-Projektmanagement) 3</Card.Subtitle>
              <Card.Text>gut (2,3)</Card.Text>
            </div>
            <div style={{ flexShrink: 0, marginRight: '-1.25rem', width: '2.25rem', paddingRight: '0.5rem', textAlign: 'center', color: 'gray' }}>
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card>
      <Card style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <Card.Header style={clip}>
          Sommersemester 2019
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item style={{ display: 'flex', flexFlow: 'row', alignItems: 'center' }}>
            <div style={{ flexGrow: 1, overflow: 'hidden' }}>
              <Card.Title style={ellipsis}>HIGHEST Ringvorlesung „Digitales Business und Start-ups“</Card.Title>
              <Card.Subtitle style={ellipsis}>Studienleistung 100%</Card.Subtitle>
              <Card.Text>nicht bestanden (nb)</Card.Text>
            </div>
            <div style={{ flexShrink: 0, marginRight: '-1.25rem', width: '2.25rem', paddingRight: '0.5rem', textAlign: 'center', color: 'gray' }}>
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
          </ListGroup.Item>
          <ListGroup.Item style={{ display: 'flex', flexFlow: 'row', alignItems: 'center' }}>
            <div style={{ flexGrow: 1, overflow: 'hidden' }}>
              <Card.Title style={ellipsis}>Chinesisch I/II c</Card.Title>
              <Card.Subtitle style={ellipsis}>Studienleistung - nur Teilnahmeschein 100%</Card.Subtitle>
              <Card.Text>bestanden (b)</Card.Text>
            </div>
            <div style={{ flexShrink: 0, marginRight: '-1.25rem', width: '2.25rem', paddingRight: '0.5rem', textAlign: 'center', color: 'gray' }}>
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
          </ListGroup.Item>
          <ListGroup.Item style={{ display: 'flex', flexFlow: 'row', alignItems: 'center' }}>
            <div style={{ flexGrow: 1, overflow: 'hidden' }}>
              <Card.Title style={ellipsis}>IT-Projektmanagement (Vorlesung)</Card.Title>
              <Card.Subtitle style={ellipsis}>Fachprüfung (IT-Projektmanagement) 3</Card.Subtitle>
              <Card.Text>gut (2,3)</Card.Text>
            </div>
            <div style={{ flexShrink: 0, marginRight: '-1.25rem', width: '2.25rem', paddingRight: '0.5rem', textAlign: 'center', color: 'gray' }}>
              <FontAwesomeIcon icon={faAngleRight} />
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card>
      <Button variant="danger" block style={{ marginTop: '1rem', marginBottom: '1rem' }} onClick={logout}>Abmelden</Button>
    </Container>
  </div>
);

export default connect(
  null,
  { logout }
)(LoginPage);
