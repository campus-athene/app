import React, { useState } from 'react';
import { Navbar, ListGroup, Container, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { session } from '../api';

const CourseRegPage = ({ lists, creds }) => {
  const history = useHistory();
  const [regState, setRegState] = useState();

  const onRegister = async (rgtrArgs) => {
    setRegState(1);
    try {
      await new session(creds).registerCourse(rgtrArgs);
      setRegState(2);
    }
    catch (error) {
      console.log(`Register failed with '${JSON.stringify(error)}'.`);
      // Todo: error is a string with a user friendly error message. Display it.
      setRegState(3);
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Navbar bg="dark" variant="dark" fixed="top">
      <Navbar.Brand onClick={() => history.goBack()} style={{ margin: '-0.5rem 0 -0.5rem -1rem', alignSelf: 'stretch', display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </Navbar.Brand>
        <Navbar.Brand>Anmeldung</Navbar.Brand>
      </Navbar>
      <Container style={{ marginTop: '3.5em', overflow: 'scroll' }}>
        { lists.map(({ id, title, modules, courses }) =>
          <ListGroup key={id} style={{ marginBottom: '1rem', marginLeft: '-15px', marginRight: '-15px' }} variant="flush">
            <ListGroup.Item className="bg-light">
              <b>{ title }</b>
            </ListGroup.Item>
            <ListGroup.Item className="bg-light">
              Module
            </ListGroup.Item>
            { modules.map(({ id, title, lecturer, rgtrAction, rgtrArgs }) =>
              <ListGroup.Item
                  key={id}>
                <h5>{title}</h5>
                <h6>{lecturer}</h6>
                { rgtrAction === 'register' &&
                  <Button variant="outline-success" onClick={() => onRegister(rgtrArgs)}>
                    Anmelden
                  </Button>
                }
                { rgtrAction === 'unregister' &&
                  <Button variant="outline-danger" onClick={() => onRegister(rgtrArgs)}>
                    Abmelden
                  </Button>
                }
              </ListGroup.Item>
            )}
            <ListGroup.Item className="bg-light">
              Veranstaltungen
            </ListGroup.Item>
            { courses.map(({ id, title, lecturer, rgtrAction, rgtrArgs }) =>
              <ListGroup.Item
                  key={id}>
                <h5>{title}</h5>
                <h6>{lecturer}</h6>
                { rgtrAction === 'register' &&
                  <Button variant="outline-success" onClick={() => onRegister(rgtrArgs)}>
                    Anmelden
                  </Button>
                }
                { rgtrAction === 'unregister' &&
                  <Button variant="outline-danger" onClick={() => onRegister(rgtrArgs)}>
                    Abmelden
                  </Button>
                }
              </ListGroup.Item>
            )}
          </ListGroup>
        )}
      </Container>
      <Modal show={Boolean(regState)}>
        <Modal.Header closeButton>
          <Modal.Title>Anmeldung</Modal.Title>
        </Modal.Header>
        <Modal.Body>{
          regState === 1 ? 
            <span>Anmeldung wird ausgeführt...</span> :
          regState === 2 ?
            <span>Anmeldung erfolgreich.</span> :
            <span>Anmeldung fehlgeschlagen. Bitte versuche es später nocheinmal.</span> }
        </Modal.Body>
        { regState > 1 ?
          <Modal.Footer>
            <Button variant="primary" onClick={() => setRegState(0)}>
              Schließen
            </Button>
          </Modal.Footer> :
          null
        }
      </Modal>
    </div>
  );
};

export default connect(
  state => ({ lists: state.courseOffers, creds: state.auth.creds })
)(CourseRegPage);
