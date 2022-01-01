import { useSelector } from 'react-redux';
import { selectStatusBarHeightCss } from '../common/commonSlice';
import Logo from '../common/Logo';
import NavButton from '../common/NavButton';
import Widget from '../common/Widget';
import MessagesWidget from '../messages/MessagesWidget';
import NewsWidget from '../news/NewsWidget';
import groupYoungPeoplePosingPhoto from './group-young-people-posing-photo.svg';

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
          textAlign: 'center',
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
        <Logo style={{ paddingTop: '3em', height: '10em' }} />
      </div>
      <div
        className="no-scrollbar"
        style={{
          borderRadius: '2em 2em 0 0',
          bottom: 0,
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
            padding: '1em 1em 0 1em',
          }}
        >
          <MessagesWidget />
          <NewsWidget />
          <Widget style={{ textAlign: 'center' }}>
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
