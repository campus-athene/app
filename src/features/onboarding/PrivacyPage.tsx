import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPrivacy } from '../settings/settingsSlice';
import { Frame, Radio } from './Controls';

const PrivacyPage = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<'complete' | 'balanced' | 'minimal'>(
    'balanced',
  );

  const onNext = () => dispatch(setPrivacy({ level: selected }));

  return (
    <Frame title="Privatsphäre" priAction="Weiter" onPriAction={onNext}>
      <p>
        Deine Privatsphäre ist uns
        <br />
        wichtig. Wähle selbst, welche
        <br />
        Daten wir zur Fehlerbehebung
        <br />
        verwenden dürfen.
      </p>
      <div className="mx-auto max-w-xs text-left">
        <Radio
          checked={selected === 'complete'}
          className="mb-4"
          label="Vollständig"
          onChange={(e) => e.target.checked && setSelected('complete')}
        >
          Helfe uns, Campus noch besser zu
          <br />
          machen. Deine Daten dürfen zur
          <br />
          Fehlerbehebung verwendet werden.
        </Radio>
        <Radio
          checked={selected === 'balanced'}
          className="mb-4"
          label="Ausgewogen"
          onChange={(e) => e.target.checked && setSelected('balanced')}
        >
          In Fehlerberichten wird besonderes
          <br />
          auf Anonymisierung geachtet.
        </Radio>
        <Radio
          checked={selected === 'minimal'}
          label="Minimal"
          onChange={(e) => e.target.checked && setSelected('minimal')}
        />
      </div>
    </Frame>
  );
};

export default PrivacyPage;
