import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faChalkboardTeacher, faFileAlt, faBook, faMapMarkedAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../auth/state';
import PageFrame from '../common/PageFrame';
import Logo from '../common/Logo';

const HomePage = ({ logout }) => {
  const [logoutModal, setLogoutModal] = useState();
  const history = useHistory();

  const HomeButton = ({ target, onClick, icon, seperator, color, children }) =>
    <h4 style={{ marginTop: seperator ? '1em' : '0.5em', color }} onClick={onClick || (() => history.push(target))}>
      <FontAwesomeIcon icon={icon} style={{ width: '1.333em', marginRight: '0.5em' }} />{children}</h4>;

  return (
    <PageFrame noBack>
      <Logo style={{ textAlign: 'center', paddingTop: '2rem', height: '40vw' }} />
      <HomeButton target={'/messages'} icon={faEnvelope}>Nachrichten</HomeButton>
      <HomeButton target={'/classreg'} icon={faChalkboardTeacher}>Veranstaltungsanmeldung</HomeButton>
      <HomeButton target={'/exams'} icon={faFileAlt}>Klausuren</HomeButton>
      <HomeButton target={'/oapp'} icon={faBook}>Orientierung</HomeButton>
      <HomeButton target={'/maps'} icon={faMapMarkedAlt}>Campuskarten</HomeButton>
      <HomeButton onClick={() => setLogoutModal(true)} icon={faSignOutAlt} seperator color="#dc3545">Abmelden</HomeButton>
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