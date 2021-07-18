import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Badge, Button, Modal } from 'react-bootstrap';
import { logout } from '../auth/authSlice';
import Logo from '../common/Logo';
import { selectUnreadCount } from '../messages/messagesSlice';
import { Envelope, Exam, Lecture, Logout, Map, Orientation } from '../../icons';

const HomePage = ({ logout }) => {
  const [logoutModal, setLogoutModal] = useState();
  const history = useHistory();
  const unreadMsgs = useSelector(selectUnreadCount());

  const HomeButton = ({ target, onClick, icon: Icon, seperator, color, children }) =>
    <h4 style={{ marginTop: seperator ? '1.5em' : '0.5em', color }} onClick={onClick || (() => history.push(target))}>
      <Icon style={{ display: 'inline-block', width: '1.875em', marginLeft: '0.125em', marginRight: '0.625em' }} />{children}</h4>;

  return (
    <div style={{
      height: '100vh',
    }}>
      <div style={{
        background: '#372649',
        height: '30em',
        textAlign: 'center',
      }}>
        <Logo style={{ paddingTop: '2em', height: '10em' }} />
      </div>
      <div style={{
        borderRadius: '2em 2em 0 0',
        inset: '3em 0 0 0',
        overflowY: 'scroll',
        position: 'absolute',
      }}>
        <div style={{
          background: 'white',
          borderRadius: '2em 2em 0 0',
          margin: '10em 0 -1vh 0',
          padding: '1em',
        }}>
          <HomeButton target={'/messages'} icon={Envelope}>Nachrichten{
            unreadMsgs
              ? <> <Badge style={{ fontSize: '0.75rem', verticalAlign: 'middle' }} pill variant="warning">{unreadMsgs}</Badge></>
              : null
          }</HomeButton>
          <HomeButton target={'/courses'} icon={Lecture}>Veranstaltungen</HomeButton>
          <HomeButton target={'/exams'} icon={Exam}>Prüfungen</HomeButton>
          <HomeButton target={'/oapp'} icon={Orientation}>Orientierung</HomeButton>
          <HomeButton target={'/maps'} icon={Map}>Campuskarten</HomeButton>
          <HomeButton onClick={() => setLogoutModal(true)} icon={Logout} seperator color="#dc3545">Abmelden</HomeButton>
        </div>
      </div>
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
    </div>
  );
};

export default connect(
  null,
  { logout }
)(HomePage);
