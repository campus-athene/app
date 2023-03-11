import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPrivacy } from '../settings/settingsSlice';
import { Button, Frame, Heading, Radio, Subheading } from './Controls';

const PrivacyPage = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<'complete' | 'balanced' | 'minimal'>(
    'balanced'
  );

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
          className="mb-4 block"
          label="Vollständig"
          onChange={(e) => e.target.checked && setSelected('complete')}
        >
          Helfe uns, Campus noch besser zu
          <br />
          machen, indem du uns erlaubst,
          <br />
          Nutzungsstatistiken zu sammeln.
        </Radio>
        <Radio
          checked={selected === 'balanced'}
          className="mb-4 block"
          label="Ausgewogen"
          onChange={(e) => e.target.checked && setSelected('balanced')}
        >
          Anonymisierte Fehlerberichte werden
          <br />
          automatisch gesendet.
          <br />
        </Radio>
        <Radio
          checked={selected === 'minimal'}
          label="Minimal"
          onChange={(e) => e.target.checked && setSelected('minimal')}
        />
      </div>
      <Button className="mx-auto" onClick={onNext} disabled={!selected}>
        Weiter
      </Button>
    </Frame>
  );
};

export default PrivacyPage;
