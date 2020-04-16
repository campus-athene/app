import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageFrame from '../components/PageFrame';
import { logout } from '../redux/auth';
import { connect } from 'react-redux';

const HomePage = ({ logout }) => {
  const [logoutModal, setLogoutModal] = useState();

  return (
    <PageFrame title="Campus">
      <h4><Link to="messages">Nachrichten</Link></h4>
      <h4><Link to="classreg">Veranstaltungsanmeldung</Link></h4>
      <h4><Link to="exams">Klausurergebnisse</Link></h4>
      <h4><Link to="maps">Campuskarten</Link></h4>
      <Button
          variant="danger"
          block
          style={{ marginTop: '1rem', marginBottom: '1rem' }}
          onClick={() => setLogoutModal(true)}>
        Abmelden
      </Button>
      <Modal show={logoutModal} centered>
        <Modal.Header>
          <Modal.Title>Abmelden</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Möchtest du dich wirklich abmelden?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setLogoutModal(false)}>Abbrechen</Button>
          <Button variant="danger" onClick={() => logout()}>Abmelden</Button>
        </Modal.Footer>
      </Modal>
    </PageFrame>
  );
};

export default connect(
  null,
  { logout }
)(HomePage);
