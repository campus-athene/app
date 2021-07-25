import { useDispatch } from 'react-redux';
import { setPrivacy } from '../settings/settingsSlice';
import { Button, Check, Frame, Heading, Subheading } from './Controls';

const PrivacyPage = () => {
  const dispatch = useDispatch();
  const onNext = () => dispatch(setPrivacy({ level: 'balanced' }));
  return (
    <Frame>
      <Heading>Privatsphäre</Heading>
      <Subheading>
        Deine Privatsphäre ist uns
        <br />
        wichtig. Wähle selbst, welche Daten
        <br />
        Du mit uns teilen möchtest.
      </Subheading>
      <div style={{ margin: '0 15vw' }}>
        <Check label="Vollständig">
          Unterstütze uns bei der Fehlersuche. Läuft was schief, werden
          Fehlerberichte automatisch gesendet. Zusätzlich dürfen
          Nutzungsstatistiken erhoben werden.
        </Check>
        <Check label="Ausgewogen">
          Fehlerbericht werden nur anonymisiert gesammelt.
        </Check>
        <Check label="Minimal" />
      </div>
      <Button onClick={onNext}>Weiter</Button>
    </Frame>
  );
};

export default PrivacyPage;
