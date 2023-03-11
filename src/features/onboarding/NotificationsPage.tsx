import { useDispatch } from 'react-redux';
import { setPushNotif } from '../settings/settingsSlice';
import { Button, Frame, Heading, Subheading } from './Controls';

const NotificationsPage = () => {
  const dispatch = useDispatch();
  const onActivate = () => dispatch(setPushNotif({ messages: true }));
  const onSkip = () => dispatch(setPushNotif({ messages: false }));

  return (
    <Frame>
      <Heading>Benachrichtigungen</Heading>
      <Subheading>
        <p>
          Möchtest Du Push-Benachrichtigungen
          <br />
          erhalten, wenn Du auf TUCaN
          <br />
          eine Nachricht erhälst?
        </p>
        <p>
          Du kannst sie jederzeit
          <br />
          wieder deaktivieren.
        </p>
      </Subheading>
      <div style={{ textAlign: 'center' }}>
        <Button onClick={onActivate}>Aktivieren</Button>
        <button
          style={{
            display: 'block',
            margin: '0.5em auto 0',
            color: 'lightgray',
            textDecoration: 'underline',
          }}
          onClick={onSkip}
        >
          Später
        </button>
      </div>
    </Frame>
  );
};

export default NotificationsPage;
