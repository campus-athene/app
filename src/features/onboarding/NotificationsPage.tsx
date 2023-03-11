import { useDispatch } from 'react-redux';
import { setPushNotif } from '../settings/settingsSlice';
import {
  Button,
  Frame,
  Heading,
  SecondaryButton,
  Subheading,
} from './Controls';

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
          eine Nachricht erhältst?
        </p>
        <p>
          Du kannst sie jederzeit
          <br />
          wieder deaktivieren.
        </p>
      </Subheading>
      <div style={{ textAlign: 'center' }}>
        <Button onClick={onActivate}>Aktivieren</Button>
        <SecondaryButton className="mx-auto mt-2 block" onClick={onSkip}>
          Später
        </SecondaryButton>
      </div>
    </Frame>
  );
};

export default NotificationsPage;
