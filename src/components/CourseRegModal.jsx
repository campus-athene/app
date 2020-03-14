import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { execute, close } from '../redux/courseReg';

const CourseRegModal = ({ state, course, message, execute, close }) => {
  if (!state)
    return null;

  const isReg = course.registration.action === 'register';
  if (!isReg && course.registration.action !== 'unregister')
    throw Error(`Illegal registration.action ${course.registration.action}.`);

  const courseDisplay =
    <ul>
      {course.registration.module ?
        <>
          <li>{course.module.title} <i>(Modul)</i></li>
          <li style={{ listStyleType: 'none' }}>und</li>
        </> :
        null}
      <li>{course.title} <i>(Veranstaltung)</i></li>
    </ul>;

  return (
    <Modal show={Boolean(state)} centered>
      <Modal.Header>
        <Modal.Title>{isReg ? "Anmelden" : "Abmelden"}</Modal.Title>
      </Modal.Header>
      {
        state === 'CONFIRM' ? <>
          <Modal.Body>
            <p>Möchtest du dich {isReg ? "zu" : "von"}</p>
            {courseDisplay}
            <p>{isReg ? "anmelden" : "abmelden"}?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => close()}>Abbrechen</Button>
            <Button onClick={() => execute()}>{isReg ? "Anmelden" : "Abmelden"}</Button>
          </Modal.Footer>
        </> :
          state === 'EXECUTING' ? <>
            <Modal.Body>
              <p>Du wirst {isReg ? "zu" : "von"}</p>
              {courseDisplay}
              <p>{isReg ? "angemeldet" : "abgemeldet"}...</p>
              <p>Dies kann ein paar Sekunden dauern.</p>
            </Modal.Body>
          </> :
            state === 'SUCCESS' ? <>
              <Modal.Body>
                <p>{isReg ? "Anmeldung zu" : "Abmeldung von"}</p>
                {courseDisplay}
                <p>erfolgreich.</p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => close()}>Schließen</Button>
              </Modal.Footer>
            </> :
              state === 'ERROR' ? <>
                <Modal.Body>
                  <p>{isReg ? "Anmeldung zu" : "Abmeldung von"}</p>
                  {courseDisplay}
                  <p>fehlgeschlagen.</p>
                  <p style={{ fontStyle: 'italic' }}>{message}</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => close()}>Schließen</Button>
                </Modal.Footer>
              </> :
                null
      }
    </Modal>
  );
};

export default connect(
  state => ({ ...state.courseReg }),
  { execute, close }
)(CourseRegModal);
