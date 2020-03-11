import React, { useState } from 'react';
import { ListGroup, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { session } from '../api';
import PageFrame from '../components/PageFrame';

const CourseRegPage = ({ lists, creds }) => {
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
    <PageFrame title="Anmeldung">
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
    </PageFrame>
  );
};

export default connect(
  state => ({ lists: state.courseOffers, creds: state.auth.creds })
)(CourseRegPage);
