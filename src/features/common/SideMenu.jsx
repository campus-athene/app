import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import {
  Envelope,
  Home,
  Lecture,
  Library,
  Map,
  Newspaper,
  Orientation,
  Settings,
  Sport,
} from '../../icons';
import { getCourseColor, selectCurrentSemester } from '../courses/coursesSlice';
import { selectUnreadCount } from '../messages/messagesSlice';
import {
  selectSideMenuOpen,
  selectStatusBarHeightCss,
  setSideMenuOpen,
} from './commonSlice';
import Logo from './Logo';

const SideMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const courses = useSelector(selectCurrentSemester());
  const menuOpen = useSelector(selectSideMenuOpen());
  const statusBarHeightCss = useSelector(selectStatusBarHeightCss());
  const unreadMsgs = useSelector(selectUnreadCount());

  const HomeButton = ({
    target,
    onClick,
    dontAutoClose,
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
      onClick={() => {
        dontAutoClose || dispatch(setSideMenuOpen(false));
        onClick && onClick();
        target && navigate(target, { replace: true });
      }}
    >
      {color ? (
        <div
          style={{
            background: color,
            display: 'inline-block',
            verticalAlign: 'middle',
            height: '1.375em',
            width: '1.5em',
            margin: '0.25em 0.875em 0.25em -2.25em',
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
      <Transition in={menuOpen} timeout={300}>
        {(transitionState) => (
          <div
            onClick={() => dispatch(setSideMenuOpen(false))}
            style={{
              background: '#0008',
              bottom: '0',
              position: 'fixed',
              top: '0',
              transition: 'opacity 300ms linear',
              width: '100%',
              ...{
                entering: { opacity: 1 },
                entered: { opacity: 1 },
                exiting: { opacity: 0 },
                exited: { opacity: 0, visibility: 'collapse' },
              }[transitionState],
            }}
          />
        )}
      </Transition>
      <Transition in={menuOpen} timeout={300}>
        {(transitionState) => (
          <div
            style={{
              background: '#372649',
              bottom: '0',
              boxShadow: '-0.4em 0 0.4em 0.5em #000',
              color: 'white',
              overflowY: 'scroll',
              paddingBottom: '1.5em',
              paddingTop: statusBarHeightCss,
              position: 'fixed',
              top: '0',
              transitionDuration: '300ms',
              transitionProperty: 'transform',
              width: '18em',
              ...{
                entering: {
                  transform: 'translateX(0)',
                  transitionTimingFunction: 'ease-out',
                },
                entered: {
                  transform: 'translateX(0)',
                },
                exiting: {
                  transform: 'translateX(-19em)',
                  transitionTimingFunction: 'ease-in',
                },
                exited: {
                  transform: 'translateX(-19em)',
                },
              }[transitionState],
            }}
          >
            <button
              onClick={() => dispatch(setSideMenuOpen(false))}
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

            <HomeButton target={'/'} icon={Home}>
              Startseite
            </HomeButton>
            <HomeButton target={'/news?hamburger'} icon={Newspaper}>
              Aktuelles
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
            <HomeButton
              onClick={() =>
                window.open('https://hds.hebis.de/ulbdamobil/', '_blank')
              }
              icon={Library}
            >
              Bibliothek
            </HomeButton>
            <HomeButton
              onClick={() =>
                window.open(
                  'https://online-anmeldung.usz.tu-darmstadt.de/angebote/aktueller_zeitraum/m.html',
                  '_blank'
                )
              }
              icon={Sport}
            >
              Sport
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
                )}/${encodeURIComponent(c.code)}?hamburger`}
              >
                {c.name}
              </HomeButton>
            ))}

            <HomeButton icon={Settings} seperator target="/settings?hamburger">
              Einstellungen
            </HomeButton>
          </div>
        )}
      </Transition>
    </>
  );
};

export default SideMenu;
