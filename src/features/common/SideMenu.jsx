import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Badge, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Envelope, Exam, Lecture, Logout, Map, Orientation } from '../../icons';
import { logout } from '../auth/authSlice';
import { getCourseColor, selectCurrentSemester } from '../courses/coursesSlice';
import { selectUnreadCount } from '../messages/messagesSlice';
import { selectStatusBarHeightCss } from './commonSlice';
import Logo from './Logo';

const SideMenu = ({ menuOpen, onClose }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const courses = useSelector(selectCurrentSemester());
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
        textOverflow: 'ellipsis',
        fontSize: '1.3em',
        marginTop: seperator ? '1.5em' : '0.5em',
        overflowX: 'hidden',
        padding: '0 1em',
        whiteSpace: 'nowrap',
      }}
      onClick={onClick || (() => history.push(target))}
    >
      {color ? (
        <div
          style={{
            background: color,
            borderRadius: '50%',
            display: 'inline-block',
            verticalAlign: 'middle',
            height: '1.375em',
            width: '1.375em',
            margin: '0.25em 0.875em 0.25em 0.375em',
          }}
        />
      ) : (
        <Icon
          style={{
            display: 'inline-block',
            width: '1.875em',
            marginLeft: '0.125em',
            marginRight: '0.625em',
          }}
        />
      )}
      {children}
    </div>
  );

  return (
    <>
      <div
        onClick={onClose}
        style={{
          background: '#0008',
          bottom: '0',
          display: menuOpen ? null : 'none',
          position: 'fixed',
          top: '0',
          width: '100%',
        }}
      />
      <div
        style={{
          background: '#372649',
          bottom: '0',
          color: 'white',
          display: menuOpen ? null : 'none',
          overflowY: 'scroll',
          paddingBottom: '1.5em',
          paddingTop: statusBarHeightCss,
          position: 'fixed',
          top: '0',
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
            padding: '0',
            position: 'absolute',
            right: '0.5em',
            top: '0.5em',
            width: '3em',
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <Logo style={{ margin: '2em 5em 2em 5em' }} />

        <HomeButton target={'/'} icon={Lecture}>
          Startseite
        </HomeButton>
        <HomeButton target={'/messages?hamburger'} icon={Envelope}>
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
        <HomeButton target={'/courses?hamburger'} icon={Lecture}>
          Mein Studium
        </HomeButton>
        <HomeButton target={'/exams?hamburger'} icon={Exam}>
          Prüfungen
        </HomeButton>
        <HomeButton
          onClick={() => {
            onClose();
            window.location.href = 'https://hds.hebis.de/ulbdamobil/';
          }}
          target={'/library?hamburger'}
          icon={Lecture}
        >
          Bibliothek
        </HomeButton>
        <HomeButton target={'/oapp?hamburger'} icon={Orientation}>
          Orientierung
        </HomeButton>
        <HomeButton target={'/maps?hamburger'} icon={Map}>
          Campuskarten
        </HomeButton>

        {courses.map((c, i) => (
          <HomeButton
            color={getCourseColor(c, 70, 100)}
            key={c.code}
            seperator={i === 0}
            target={`/courses/${encodeURIComponent(
              c.semester
            )}/${encodeURIComponent(c.code)}`}
          >
            {c.name}
          </HomeButton>
        ))}

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
