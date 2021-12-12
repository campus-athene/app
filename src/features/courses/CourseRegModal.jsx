import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { register } from './offersSlice';

const CourseRegModal = ({ offer, onClose }) => {
  const [state, setState] = useState('CONFIRM');
  const [selection, _setSelection] = useState(
    offer && {
      ...Object.fromEntries(
        offer.courses.map(({ id, status }) => [
          id,
          offer.status === status ||
            (offer.status === 'edit' && status === 'register'),
        ])
      ),
    }
  );
  const setSelection = (key, value) =>
    _setSelection({ ...selection, [key]: value });
  const [error, setError] = useState();
  const dispatch = useDispatch();

  if (!offer) return null;

  if (offer.status === 'edit' && state === 'CONFIRM') {
    setState('ERROR');
    setError('Nutzte bitte TUCaN um Dich umzumelden.');
  }

  const execute = async () => {
    setState('EXECUTING');

    const error = await dispatch(
      register({
        action: offer.status,
        module: offer.status === 'register' && offer.regArgs ? offer : null,
        courses: offer.courses.filter((c) =>
          offer.status !== 'edit'
            ? selection[c.id]
            : selection[c.id]
            ? c.status === 'register'
            : c.status === 'unregister'
        ),
      })
    );

    if (!error) {
      setState('SUCCESS');
      return;
    }
    setState('ERROR');
    setError(error);
  };

  return (
    <Modal show={true} centered onHide={onClose}>
      <Modal.Header>
        <Modal.Title>
          {offer.status === 'register'
            ? 'Anmeldung bestätigen'
            : offer.status === 'edit'
            ? 'Anmeldung bearbeiten'
            : offer.status === 'unregister'
            ? 'Abmeldung bestätigen'
            : 'Anmeldung bestätigen'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {offer.courses.length === 1 ? (
          <>
            <div style={{ marginBottom: '1em' }}>
              Möchtest du dich {offer.status === 'register' ? 'zu' : 'von'}
            </div>
            <div style={{ marginBottom: '1em' }}>{offer.name}</div>
            <div>{offer.status === 'register' ? 'anmelden' : 'abmelden'}?</div>
          </>
        ) : (
          <>
            <div style={{ marginBottom: '1em' }}>
              {offer.status !== 'unregister' ? 'Zu' : 'Von'} welchen
              Veranstaltungen möchtest du{' '}
              {offer.status === 'register'
                ? 'dich anmelden'
                : offer.status === 'unregister'
                ? 'dich abmelden'
                : 'angemeldet sein'}
              ?
            </div>
            <div style={{ marginBottom: '1em' }}>
              {offer.courses.map((c) => (
                <Form.Check
                  id={`uglyworkaroundcheckboxid${c.id}`}
                  key={c.id}
                  checked={selection[c.id]}
                  type="checkbox"
                  custom
                  disabled={state !== 'CONFIRM'}
                  label={`${c.code} ${c.name}`}
                  onChange={(e) => setSelection(c.id, e.target.checked)}
                />
              ))}
            </div>
            <div>{offer.status === 'register' ? 'anmelden' : 'abmelden'}?</div>
          </>
        )}
        {error && (
          <div style={{ marginTop: '1em' }} className="text-danger">
            {error}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer
        style={{ height: '4.5rem' }}
        onClick={() => (state === 'SUCCESS' || state === 'ERROR') && onClose()}
      >
        {state === 'CONFIRM' ? (
          <>
            <Button variant="secondary" onClick={onClose}>
              Abbrechen
            </Button>
            <Button
              onClick={execute}
              disabled={!Object.values(selection).some((s) => s)}
            >
              {offer.status === 'register'
                ? 'Anmelden'
                : offer.status === 'unregister'
                ? 'Abmelden'
                : 'Bestätigen'}
            </Button>
          </>
        ) : state === 'EXECUTING' ? (
          <Spinner style={{ margin: 'auto' }} animation="grow" variant="dark" />
        ) : state === 'SUCCESS' ? (
          <svg style={{ height: '2rem', margin: 'auto' }} viewBox="0 0 512 512">
            <path
              d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0"
              fill="#28a745"
            />
            <path
              d="m385.75 201.75-138.667969 138.664062c-4.160156 4.160157-9.621093 6.253907-15.082031 6.253907s-10.921875-2.09375-15.082031-6.253907l-69.332031-69.332031c-8.34375-8.339843-8.34375-21.824219 0-30.164062 8.339843-8.34375 21.820312-8.34375 30.164062 0l54.25 54.25 123.585938-123.582031c8.339843-8.34375 21.820312-8.34375 30.164062 0 8.339844 8.339843 8.339844 21.820312 0 30.164062zm0 0"
              fill="#fafafa"
            />
          </svg>
        ) : state === 'ERROR' ? (
          <svg style={{ height: '2rem', margin: 'auto' }} viewBox="0 0 512 512">
            <path
              d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0"
              fill="#dc3545"
            />
            <path
              d="m350.273438 320.105469c8.339843 8.34375 8.339843 21.824219 0 30.167969-4.160157 4.160156-9.621094 6.25-15.085938 6.25-5.460938 0-10.921875-2.089844-15.082031-6.25l-64.105469-64.109376-64.105469 64.109376c-4.160156 4.160156-9.621093 6.25-15.082031 6.25-5.464844 0-10.925781-2.089844-15.085938-6.25-8.339843-8.34375-8.339843-21.824219 0-30.167969l64.109376-64.105469-64.109376-64.105469c-8.339843-8.34375-8.339843-21.824219 0-30.167969 8.34375-8.339843 21.824219-8.339843 30.167969 0l64.105469 64.109376 64.105469-64.109376c8.34375-8.339843 21.824219-8.339843 30.167969 0 8.339843 8.34375 8.339843 21.824219 0 30.167969l-64.109376 64.105469zm0 0"
              fill="#fafafa"
            />
          </svg>
        ) : null}
      </Modal.Footer>
    </Modal>
  );
};

export default CourseRegModal;
