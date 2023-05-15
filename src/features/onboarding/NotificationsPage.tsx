import { useDispatch } from 'react-redux';
import { setPushNotif } from '../settings/settingsSlice';
import { Frame } from './Controls';

const NotificationsPage = () => {
  const dispatch = useDispatch();
  const onActivate = () => dispatch(setPushNotif({ messages: true }));
  const onSkip = () => dispatch(setPushNotif({ messages: false }));

  return (
    <Frame
      title="Benachrichtigungen"
      priAction="Aktivieren"
      secAction="Später aktivieren"
      onPriAction={onActivate}
      onSecAction={onSkip}
    >
      <div>
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
      </div>
    </Frame>
  );
};

export default NotificationsPage;
