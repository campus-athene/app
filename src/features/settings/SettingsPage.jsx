import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import CardModal, { Header as ModalHeader } from '../../components/CardModal';
import PageFrame from '../../components/PageFrame';
import { useCoreWebserviceGetSiteInfo } from '../../provider/moodle';
import { logout } from '../auth/authSlice';
import {
  selectPrivacy,
  selectPushEnabled,
  setPrivacy,
  setPushNotif,
} from './settingsSlice';

const Header = ({ children }) => (
  <div
    style={{
      borderBottom: '1px solid #CCC',
      color: '#444',
      fontSize: '0.75rem',
      lineHeight: 1,
      padding: '0.5625rem 1rem 0.125rem 1rem',
    }}
  >
    {children}
  </div>
);
const Separator = () => (
  <div
    style={{
      borderBottom: '1px solid #CCC',
      height: '1.5em',
    }}
  ></div>
);
const Setting = ({ checked, description, children, onClick }) => (
  <div
    onClick={onClick}
    style={{
      background: 'white',
      borderBottom: '1px solid #CCC',
      fontSize: '1.25rem',
      lineHeight: 1,
      overflowX: 'hidden',
      padding: '0.875rem 1rem 0.8125rem',
      paddingLeft: typeof checked === 'boolean' ? '2.5rem' : '1rem',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }}
  >
    {typeof checked === 'boolean' && (
      <FontAwesomeIcon
        icon={faCheck}
        style={{
          visibility: checked ? 'visible' : 'hidden',
          marginBottom: '0.15em',
          marginLeft: '-1.5em',
          height: '0.7em',
          width: '1.5em',
        }}
      />
    )}
    {children}
    {description && (
      <div
        style={{
          display: 'block',
          fontSize: '0.75rem',
          color: '#555',
          whiteSpace: 'initial',
          lineHeight: '1.5',
          marginTop: '0.5em',
        }}
      >
        {description}
      </div>
    )}
  </div>
);
const SettingButton = ({ children, onClick, variant }) => (
  <div
    onClick={onClick}
    style={{
      background: 'white',
      borderBottom: '1px solid #CCC',
      color: variant === 'danger' ? '#E03939' : null,
      fontSize: '1.25em',
      lineHeight: 1,
      padding: '0.875rem 1rem 0.8125rem 1rem',
      overflowX: 'hidden',
      textAlign: 'center',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </div>
);
const Hint = ({ children }) => (
  <div
    style={{
      color: '#444',
      fontSize: '0.75em',
      padding: '0.125rem 1rem 0.5625rem 1rem',
    }}
  >
    {children}
  </div>
);

const SettingsPage = () => {
  const dispatch = useDispatch();
  const [logoutModal, setLogoutModal] = useState();

  const moodleSiteInfo = useCoreWebserviceGetSiteInfo();

  const pushMessages = useSelector(selectPushEnabled('messages'));
  const { level: privacy } = useSelector(selectPrivacy());

  const setMessagePushHandler = (value) => () =>
    dispatch(setPushNotif({ messages: value }));
  const setPrivacyHandler = (level) => () => dispatch(setPrivacy({ level }));

  return (
    <>
      <PageFrame
        title="Einstellungen"
        style={{ background: '#F4F4F4', paddingBottom: '2em' }}
      >
        <Header>Profil</Header>
        <Setting>
          <div className="text-xs text-neutral-400">Vorname:</div>
          <div>
            {moodleSiteInfo.data?.firstname ?? (
              <i>{moodleSiteInfo.isLoading ? 'Lädt...' : 'Fehler'}</i>
            )}
          </div>
        </Setting>
        <Setting>
          <div className="text-xs text-neutral-400">Nachname:</div>
          <div>
            {moodleSiteInfo.data?.lastname ?? (
              <i>{moodleSiteInfo.isLoading ? 'Lädt...' : 'Fehler'}</i>
            )}
          </div>
        </Setting>
        <Setting>
          <div className="text-xs text-neutral-400">TU-ID:</div>
          <div>
            {moodleSiteInfo.data?.username ?? (
              <i>{moodleSiteInfo.isLoading ? 'Lädt...' : 'Fehler'}</i>
            )}
          </div>
        </Setting>

        <Header>Benachrichtigungen</Header>
        <Setting checked={pushMessages} onClick={setMessagePushHandler(true)}>
          Aktiviert
        </Setting>
        <Setting checked={!pushMessages} onClick={setMessagePushHandler(false)}>
          Deaktiviert
        </Setting>
        <Header>Privatsphäre</Header>
        <Setting
          checked={privacy === 'complete'}
          description={
            <>
              Unterstütze uns bei der Fehlersuche. Läuft was schief, werden
              Fehlerberichte automatisch gesendet. Zusätzlich dürfen
              Nutzungsstatistiken erhoben werden.
            </>
          }
          onClick={setPrivacyHandler('complete')}
        >
          Vollständig
        </Setting>
        <Setting
          checked={privacy === 'balanced'}
          description={<>Fehlerbericht werden nur anonymisiert gesammelt.</>}
          onClick={setPrivacyHandler('balanced')}
        >
          Ausgewogen
        </Setting>
        <Setting
          checked={privacy === 'minimal'}
          onClick={setPrivacyHandler('minimal')}
        >
          Minimal
        </Setting>
        <Separator />
        <SettingButton
          onClick={() =>
            window.open(
              'https://www.idm.tu-darmstadt.de/password/account',
              '_blank'
            )
          }
        >
          Passwort ändern
        </SettingButton>
        <Separator />
        <SettingButton onClick={() => setLogoutModal(true)} variant="danger">
          Abmelden
        </SettingButton>
        <Hint>
          Wenn Du Dich abmeldest, werden alle von der App auf Deinem Smartphone
          gespeicherten Daten gelöscht.
        </Hint>
        <Separator />
        <SettingButton
          onClick={() =>
            window.open('https://www.study-campus.de/legal.html', '_blank')
          }
        >
          Impressum
        </SettingButton>
      </PageFrame>
      <CardModal open={logoutModal} onClose={() => setLogoutModal(false)}>
        <ModalHeader>Abmelden</ModalHeader>
        <p>Möchtest Du Dich wirklich abmelden?</p>
        <div className="mt-4 flex gap-2">
          <Button className="bg-gray-400" onClick={() => setLogoutModal(false)}>
            Abbrechen
          </Button>
          <Button
            className="bg-red-500"
            onClick={() => {
              setLogoutModal(false);
              dispatch(logout());
            }}
          >
            Abmelden
          </Button>
        </div>
      </CardModal>
    </>
  );
};

export default SettingsPage;
