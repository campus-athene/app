import React from 'react';
import PageFrame from '../common/PageFrame';
import { useHistory } from 'react-router';
import stadtmitte from './data/stadtmitte.png';
import lichtwiese from './data/lichtwiese.png';
import windkanal from './data/windkanal.png';

const MapPreview = ({ title, abbrev, onClick, map, viewBox }) => (
  <div
    style={{
      margin: '0 1em 1em 1em',
      position: 'relative',
    }}
    onClick={onClick}
  >
    <svg viewBox={viewBox} style={{ borderRadius: '0.5rem' }}>
      <image href={map} preserveAspectRatio="none" width="1000" />
    </svg>
    <div
      style={{
        position: 'absolute',
        bottom: '0',
        background: '#fffa',
        right: 0,
        left: 0,
        fontSize: '1.2em',
        padding: '0.25em 0.75em',
      }}
    >
      <span style={{ fontWeight: 'bold' }}>{abbrev}</span>
      {title}
    </div>
    <div
      style={{
        position: 'absolute',
        borderRadius: '0.5em',
        border: '1px solid lightgray',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
      }}
    />
  </div>
);

const MapListPage = () => {
  const history = useHistory();
  return (
    <PageFrame title="Karten">
      <div style={{ height: '1em' }} />
      <MapPreview
        title="tadtmitte"
        abbrev="S"
        onClick={() => history.push('/maps/stadtmitte')}
        map={stadtmitte}
        viewBox="490 330 414 207"
      />
      <MapPreview
        title="ichtwiese"
        abbrev="L"
        onClick={() => history.push('/maps/lichtwiese')}
        map={lichtwiese}
        viewBox="445 550 500 250"
      />
      <MapPreview
        title="otanischer Garten"
        abbrev="B"
        onClick={() => history.push('/maps/botanischergarten')}
        map={lichtwiese}
        viewBox="470 70 500 250"
      />
      <MapPreview
        title="ochschulstadion"
        abbrev="H"
        onClick={() => history.push('/maps/hochschulstadion')}
        map={lichtwiese}
        viewBox="100 660 500 250"
      />
      <MapPreview
        title="indkanal"
        abbrev="W"
        onClick={() => history.push('/maps/windkanal')}
        map={windkanal}
        viewBox="0 240 1000 500"
      />
    </PageFrame>
  );
};

export default MapListPage;
