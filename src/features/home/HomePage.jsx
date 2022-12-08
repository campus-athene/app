import { useSelector } from 'react-redux';
import Logo from '../../components/Logo';
import NavButton from '../../components/NavButton';
import { selectStatusBarHeightCss } from '../../redux/globalSlice';
import CalendarWidget from '../calendar/CalendarWidget';
import CanteenWidget from '../canteen/CanteenWidget';
import EventWidget from '../events/EventWidget';
import MessagesWidget from '../messages/MessagesWidget';
import NewsWidget from '../news/NewsWidget';
import groupYoungPeoplePosingPhoto from './group-young-people-posing-photo.svg';
import Widget from './Widget';

const HomePage = () => {
  const statusBarHeightCss = useSelector(selectStatusBarHeightCss());

  return (
    <div
      style={{
        height: '100vh',
        position: 'relative',
      }}
    >
      <div
        style={{
          background: '#372649',
          height: '30em',
          paddingTop: statusBarHeightCss,
          position: 'fixed',
          width: '100%',
        }}
      >
        <NavButton
          style={{
            left: '0',
            position: 'absolute',
          }}
          type="hamburger"
        />
        <Logo
          className="mx-auto"
          style={{ paddingTop: '3em', height: '10em' }}
        />
      </div>
      <div
        className="no-scrollbar"
        style={{
          borderRadius: '2em 2em 0 0',
          bottom: 0,
          // Fix Safari not cropping in rounded corners
          WebkitMaskImage: '-webkit-radial-gradient(white, black)',
          overflowY: 'scroll',
          position: 'absolute',
          top: `calc(${statusBarHeightCss} + 3em)`,
          width: '100%',
        }}
      >
        <div
          style={{
            background: 'white',
            borderRadius: '2em 2em 0 0',
            marginTop: '10em',
            paddingBottom: 'env(safe-area-inset-bottom)',
            paddingTop: '2rem',
          }}
        >
          <CalendarWidget />
          <MessagesWidget />
          <CanteenWidget />
          <NewsWidget />
          <EventWidget />
          <Widget
            style={{
              textAlign: 'center',
              paddingBottom: '1.5rem',
              paddingTop: '2rem',
            }}
          >
            <div style={{ fontSize: '1.4em' }}>
              Zusammen macht’s
              <br />
              am meisten Spaß
            </div>
            <img
              src={groupYoungPeoplePosingPhoto}
              style={{ height: '12em', margin: '-1em auto' }}
              alt="focused people studying"
            />
            <div>
              Empfehle Campus Deinen Freunden und
              <br />
              meistert das Studium gemeinsam.
            </div>
          </Widget>
          <Widget
            onClick={() => (window.location.href = 'mailto:campus@oliverrm.de')}
            style={{ padding: '0.5rem' }}
          >
            Gefällt Dir Campus? Hast Du Vorschläge für Verbesserungen? Wir
            freuen uns über Dein Feedback.
          </Widget>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
