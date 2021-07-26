import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Badge, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Envelope, Exam, Lecture, Logout, Map, Orientation } from '../../icons';
import { logout } from '../auth/authSlice';
import { selectUnreadCount } from '../messages/messagesSlice';
import { selectStatusBarHeightCss } from './commonSlice';
import Logo from './Logo';

const SideMenu = ({ menuOpen, onClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const statusBarHeightCss = useSelector(selectStatusBarHeightCss());
  const unreadMsgs = useSelector(selectUnreadCount());
  
  const [logoutModal, setLogoutModal] = useState();

  const HomeButton = ({
    target,
    onClick,
    icon: Icon,
    seperator,
    color,
    children,
  }) => (
    <div
      style={{
        fontSize: '1.3em',
        marginTop: seperator ? '1.5em' : '0.5em',
        padding: '0 1em',
      }}
      onClick={onClick || (() => history.push(target))}
    >
      <Icon
        style={{
          display: 'inline-block',
          width: '1.875em',
          marginLeft: '0.125em',
          marginRight: '0.625em',
        }}
      />
      {children}
    </div>
  );

  return (
    <>
      <div
        onClick={onClose}
        style={{
          background: '#0008',
          display: menuOpen ? null : 'none',
          inset: '0',
          position: 'fixed',
        }}
      />
      <div
        style={{
          background: '#372649',
          color: 'white',
          display: menuOpen ? null : 'none',
          inset: '0 auto 0 0',
          overflowY: 'scroll',
          paddingTop: statusBarHeightCss,
          position: 'fixed',
          width: '18em',
        }}
      >
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            height: '3em',
            inset: '0.5em 0.5em auto auto',
            padding: '0',
            position: 'absolute',
            width: '3em',
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <Logo style={{ margin: '2em 5em 2em 5em' }} />

        <HomeButton target={'/messages'} icon={Envelope}>
          Nachrichten
          {unreadMsgs ? (
            <>
              {' '}
              <Badge
                style={{ fontSize: '0.75rem', verticalAlign: 'middle' }}
                pill
                variant="warning"
              >
                {unreadMsgs}
              </Badge>
            </>
          ) : null}
        </HomeButton>
        <HomeButton target={'/courses'} icon={Lecture}>
          Veranstaltungen
        </HomeButton>
        <HomeButton target={'/exams'} icon={Exam}>
          Prüfungen
        </HomeButton>
        <HomeButton target={'/oapp'} icon={Orientation}>
          Orientierung
        </HomeButton>
        <HomeButton target={'/maps'} icon={Map}>
          Campuskarten
        </HomeButton>
        <HomeButton
          onClick={() => setLogoutModal(true)}
          icon={Logout}
          seperator
        >
          Abmelden
        </HomeButton>
      </div>
      <Modal show={logoutModal} centered>
        <Modal.Header>
          <Modal.Title>Abmelden</Modal.Title>
        </Modal.Header>
        <Modal.Body>Möchtest du dich wirklich abmelden?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setLogoutModal(false)}>
            Abbrechen
          </Button>
          <Button variant="danger" onClick={() => dispatch(logout())}>
            Abmelden
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SideMenu;
