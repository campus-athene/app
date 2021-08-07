import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { selectStatusBarHeightCss } from '../common/commonSlice';
import Logo from '../common/Logo';
import SideMenu from '../common/SideMenu';
import { selectUnreadCount } from '../messages/messagesSlice';
import { Envelope } from '../../icons';
import groupYoungPeoplePosingPhoto from './group-young-people-posing-photo.svg';

const HomePage = ({ logout }) => {
  const history = useHistory();
  const unreadMsgs = useSelector(selectUnreadCount());
  const [menuOpen, setMenuOpen] = useState(false);
  const statusBarHeightCss = useSelector(selectStatusBarHeightCss());

  const Widget = (props) =>
    React.createElement('div', {
      ...props,
      style: {
        border: '1px solid lightgray',
        borderRadius: '1em',
        marginBottom: '1em',
        padding: '1em',
        ...props.style,
      },
    });

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
          position: 'fixed',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <button
          onClick={() => setMenuOpen(true)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            height: '3em',
            left: '0',
            padding: '0',
            position: 'absolute',
            top: statusBarHeightCss,
            width: '3em',
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <Logo style={{ paddingTop: '3em', height: '10em' }} />
      </div>
      <div
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
          {unreadMsgs && (
            <Widget onClick={() => history.push('/messages')}>
              <span style={{ fontSize: '1.2em' }}>
                <Envelope
                  style={{
                    display: 'inline-block',
                    marginRight: '0.5em',
                    width: '2em',
                  }}
                />
                {unreadMsgs} neue Nachrichten
              </span>
            </Widget>
          )}
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
      <SideMenu menuOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
};

export default HomePage;
