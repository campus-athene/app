import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { registerExam } from '../redux/exams';

const ExamRegModal = ({ exam, closeCallback }) => {
  const dispatch = useDispatch();

  const [state, setState] = useState('CONFIRM');
  const [message, setMessage] = useState();

  const isReg = exam.regAction === 'register';
  if (!isReg && exam.regAction !== 'unregister')
    throw Error(`Illegal regAction ${exam.regAction}.`);

  const display =
    <p>
      {exam.courseName}<br />
      <i>{exam.examName}</i>
    </p>;

  const execute = async () => {
    setState('EXECUTING');
    const result = await dispatch(registerExam(exam.id, exam.semester, exam.regAction));
    if (result) {
      setState('ERROR');
      setMessage(result);
    }
    else {
      setState('SUCCESS');
    }
  }

  return (
    <Modal show={true} centered>
      <Modal.Header>
        <Modal.Title>{isReg ? "Anmelden" : "Abmelden"}</Modal.Title>
      </Modal.Header>
      {
        state === 'CONFIRM' ? <>
          <Modal.Body>
            <p>Möchtest du dich {isReg ? "zu" : "von"}</p>
            {display}
            <p>{isReg ? "anmelden" : "abmelden"}?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => closeCallback()}>Abbrechen</Button>
            <Button onClick={() => execute()}>{isReg ? "Anmelden" : "Abmelden"}</Button>
          </Modal.Footer>
        </> :
          state === 'EXECUTING' ? <>
            <Modal.Body>
              <p>Du wirst {isReg ? "zu" : "von"}</p>
              {display}
              <p>{isReg ? "angemeldet" : "abgemeldet"}...</p>
              <p>Dies kann ein paar Sekunden dauern.</p>
            </Modal.Body>
          </> :
            state === 'SUCCESS' ? <>
              <Modal.Body>
                <p>{isReg ? "Anmeldung zu" : "Abmeldung von"}</p>
                {display}
                <p>erfolgreich.</p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => closeCallback()}>Schließen</Button>
              </Modal.Footer>
            </> :
              state === 'ERROR' ? <>
                <Modal.Body>
                  <p>{isReg ? "Anmeldung zu" : "Abmeldung von"}</p>
                  {display}
                  <p className="text-danger">fehlgeschlagen.</p>
                  <p style={{ fontStyle: 'italic' }}>{message}</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={() => closeCallback()}>Schließen</Button>
                </Modal.Footer>
              </> :
                null
      }
    </Modal>
  );
};

export default ExamRegModal;
