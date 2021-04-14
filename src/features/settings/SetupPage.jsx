import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setPushNotif } from './settingsSlice';

const SetupPage = () => {
  const dispatch = useDispatch();
  const onActivate = () => dispatch(setPushNotif({ messages: true }));
  const onSkip = () => dispatch(setPushNotif({ messages: false }));

  return (
    <div
      style={{
        height: '100vh',
        background: '#463A54',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        paddingTop: 'env(safe-area-inset-bottom))',
        paddingBottom: 'env(safe-area-inset-bottom))',
      }}
    >
      <h3
        style={{
          fontWeight: 'normal',
          color: 'lightgray',
          textAlign: 'center',
        }}
      >
        Benachrichtigungen
      </h3>
      <div style={{ color: 'lightgray', textAlign: 'center' }}>
        <p>
          Möchtest du Push-Benachrichtigungen
          <br />
          erhalten, wenn du auf TUCaN
          <br />
          eine Nachricht erhälst?
        </p>
        <p>
          Du kannst sie jederzeit
          <br />
          wieder deaktivieren.
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Button
          style={{ margin: '0 auto 0.5em' }}
          variant="warning"
          onClick={onActivate}
        >
          Benachrichtigungen aktivieren
        </Button>
        <Button
          style={{
            display: 'block',
            margin: '0 auto',
            color: 'lightgray',
            textDecoration: 'underline',
          }}
          variant="link"
          onClick={onSkip}
        >
          Später
        </Button>
      </div>
    </div>
  );
};

export default SetupPage;
