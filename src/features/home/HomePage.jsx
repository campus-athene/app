import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { logout } from '../auth/state';
import PageFrame from '../common/PageFrame';
import Logo from '../common/Logo';
import { Envelope, Exam, Lecture, Logout, Map, Orientation } from '../../icons';

const HomePage = ({ logout }) => {
  const [logoutModal, setLogoutModal] = useState();
  const history = useHistory();

  const HomeButton = ({ target, onClick, icon: Icon, seperator, color, children }) =>
    <h4 style={{ marginTop: seperator ? '1.5em' : '0.5em', color }} onClick={onClick || (() => history.push(target))}>
      <Icon style={{ display: 'inline-block', width: '1.875em', marginLeft: '0.125em', marginRight: '0.625em' }} />{children}</h4>;

  return (
    <PageFrame noBack>
      <Logo style={{ textAlign: 'center', paddingTop: '2rem', height: '10rem' }} />
      <HomeButton target={'/messages'} icon={Envelope}>Nachrichten</HomeButton>
      <HomeButton target={'/classreg'} icon={Lecture}>Veranstaltungen</HomeButton>
      <HomeButton target={'/exams'} icon={Exam}>Prüfungen</HomeButton>
      <HomeButton target={'/oapp'} icon={Orientation}>Orientierung</HomeButton>
      <HomeButton target={'/maps'} icon={Map}>Campuskarten</HomeButton>
      <HomeButton onClick={() => setLogoutModal(true)} icon={Logout} seperator color="#dc3545">Abmelden</HomeButton>
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
