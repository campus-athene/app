import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPrivacy } from '../settings/settingsSlice';
import { Button, Frame, Heading, Radio, Subheading } from './Controls';

const PrivacyPage = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState('balanced');

  const onNext = () => dispatch(setPrivacy({ level: selected }));

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
        <Radio
          checked={selected === 'complete'}
          label="Vollständig"
          onChange={(e) => e.target.checked && setSelected('complete')}
        >
          Unterstütze uns bei der Fehlersuche. Läuft was schief, werden
          Fehlerberichte automatisch gesendet. Zusätzlich dürfen
          Nutzungsstatistiken erhoben werden.
        </Radio>
        <Radio
          checked={selected === 'balanced'}
          label="Ausgewogen"
          onChange={(e) => e.target.checked && setSelected('balanced')}
        >
          Fehlerbericht werden nur anonymisiert gesammelt.
        </Radio>
        <Radio
          checked={selected === 'minimal'}
          label="Minimal"
          onChange={(e) => e.target.checked && setSelected('minimal')}
        />
      </div>
      <Button onClick={onNext} disabled={!selected}>
        Weiter
      </Button>
    </Frame>
  );
};

export default PrivacyPage;
