import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SwipeableDrawer } from '@mui/material';
import { Property } from 'csstype';
import {
  ComponentClass,
  FunctionComponent,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { To, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import { useUnreadMessagesCount } from '../../provider/camusnet/messages';
import { selectStatusBarHeightCss } from '../../redux/globalSlice';
import { getCourseColor, selectCurrentSemester } from '../courses/coursesSlice';
import {
  Burger,
  Calendar,
  Document,
  Envelope,
  Home,
  Lecture,
  Library,
  Map,
  Newspaper,
  Orientation,
  Room,
  Settings,
  Sport,
} from './icons';
import { selectSideMenuOpen, setSideMenuOpen } from './sideMenuSlice';

type HomeButtonType = {
  target?: To;
  onClick?: MouseEventHandler<HTMLDivElement>;
  dontAutoClose?: boolean;
  icon?:
    | FunctionComponent<HTMLAttributes<HTMLDivElement>>
    | ComponentClass<HTMLAttributes<HTMLDivElement>>;
  separator?: boolean;
  color?: Property.Background<string | number>;
  children: ReactNode;
};

const SideMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const courses = useSelector(selectCurrentSemester());
  const menuOpen = useSelector(selectSideMenuOpen());
  const statusBarHeightCss = useSelector(selectStatusBarHeightCss());
  const unreadMsgs = useUnreadMessagesCount();

  const HomeButton = ({
    target,
    onClick,
    dontAutoClose,
    icon: Icon,
    separator,
    color,
    children,
  }: HomeButtonType) => (
    <div
      style={{
        textOverflow: 'ellipsis',
        fontSize: '1.3em',
        marginTop: separator ? '2.5em' : '1em',
        overflowX: 'hidden',
        padding: '0 1em',
        whiteSpace: 'nowrap',
      }}
      onClick={(e) => {
        dontAutoClose || dispatch(setSideMenuOpen(false));
        onClick && onClick(e);
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
      ) : Icon ? (
        <Icon
          style={{
            display: 'inline-block',
            verticalAlign: 'bottom',
            width: '1.5em',
            marginLeft: '0.125em',
            marginRight: '0.625em',
          }}
        />
      ) : null}
      {children}
    </div>
  );

  return (
    <SwipeableDrawer
      anchor="left"
      disableSwipeToOpen={false}
      open={menuOpen}
      onClose={() => dispatch(setSideMenuOpen(false))}
      onOpen={() => dispatch(setSideMenuOpen(true))}
      PaperProps={{
        style: {
          display: 'block',
          background: '#372649',
          color: 'white',
          overflowY: 'scroll',
          paddingBottom: '1.5em',
          paddingTop: statusBarHeightCss,
          width: '18em',
        },
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
          top: `calc(0.5em + ${statusBarHeightCss})`,
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
        {unreadMsgs.data ? (
          <>
            {' '}
            <div className="inline-block rounded-full bg-yellow-500 px-2 align-top text-sm font-bold text-black">
              {unreadMsgs.data > 99 ? '99+' : unreadMsgs.data}
            </div>
          </>
        ) : null}
      </HomeButton>
      <HomeButton target={'/calendar?hamburger'} icon={Calendar}>
        Kalender
      </HomeButton>
      <HomeButton target={'/courses?hamburger'} icon={Lecture}>
        Mein Studium
      </HomeButton>
      <HomeButton target={'/canteen?hamburger'} icon={Burger}>
        Mensa
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
      <HomeButton
        icon={Room}
        onClick={() =>
          window.open('https://rc.tucan.tu-darmstadt.de/', '_blank')
        }
      >
        Lernräume
      </HomeButton>

      {courses.map((c, i) => (
        <HomeButton
          color={getCourseColor(c, 70, 100)}
          key={c.code}
          separator={i === 0}
          target={`/courses/${encodeURIComponent(
            c.semester
          )}/${encodeURIComponent(c.code)}?hamburger`}
        >
          {c.name}
        </HomeButton>
      ))}

      <HomeButton icon={Document} separator target="/documents?hamburger">
        Dokumente
      </HomeButton>
      <HomeButton icon={Settings} target="/settings?hamburger">
        Einstellungen
      </HomeButton>
    </SwipeableDrawer>
  );
};

export default SideMenu;
