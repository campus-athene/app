import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { ImageOverlay, MapContainer } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { log } from '../../app/errorReporting';
import { selectStatusBarHeightCss } from '../../redux/globalSlice';
import lichtwiese from './data/lichtwiese.png';
import stadtmitte from './data/stadtmitte.png';
import windkanal from './data/windkanal.png';

const getViewData = (view) => {
  return view === 'stadtmitte'
    ? {
        center: [49.8758, 8.6568],
        zoom: 16,
      }
    : view === 'lichtwiese'
    ? {
        center: [49.86, 8.681],
        zoom: 15,
      }
    : view === 'botanischergarten'
    ? {
        center: [49.868, 8.681],
        zoom: 16,
      }
    : view === 'hochschulstadion'
    ? {
        center: [49.86, 8.672],
        zoom: 16,
      }
    : view === 'windkanal'
    ? {
        center: [49.86, 8.592],
        zoom: 16,
      }
    : log('warning', `MapViewPage was parsed an invalid map parameter.`, {
        map: view,
      }) || {
        center: [49.8758, 8.6568],
        zoom: 16,
      };
};

const MapViewPage = () => {
  const statusBarHeightCss = useSelector(selectStatusBarHeightCss());

  useEffect(() => {
    if (!['android', 'ios'].includes(Capacitor.getPlatform())) return;
    const promise = StatusBar.setStyle({ style: Style.Light });
    return () => promise.then(() => StatusBar.setStyle({ style: Style.Dark }));
  }, []);

  const { map: mapArg } = useParams();
  const map = getViewData(mapArg);
  const navigate = useNavigate();

  return (
    <div className="relative h-screen">
      <MapContainer
        className="absolute inset-0 bg-[#aaa]"
        center={map.center}
        maxBounds={[
          [49.8901, 8.5783],
          [49.8516, 8.694],
        ]}
        maxZoom={18}
        minZoom={13}
        zoom={map.zoom}
        zoomControl={false}
      >
        <ImageOverlay
          attribution="&copy; TU Darmstadt"
          bounds={[
            [49.8846, 8.6367],
            [49.8655, 8.6666],
          ]}
          url={stadtmitte}
        />
        <ImageOverlay
          attribution="&copy; TU Darmstadt"
          bounds={[
            [49.8716, 8.6636],
            [49.8571, 8.6885],
          ]}
          url={lichtwiese}
        />
        <ImageOverlay
          attribution="&copy; TU Darmstadt"
          bounds={[
            [49.8642, 8.5842],
            [49.8547, 8.6001],
          ]}
          url={windkanal}
        />
      </MapContainer>
      <div
        style={{
          position: 'absolute',
          display: 'grid',
          alignItems: 'center',
          justifyItems: 'center',
          top: `calc(1em + ${statusBarHeightCss})`,
          left: 'calc(1em + env(safe-area-inset-left))',
          background: '#aaaa',
          width: '3em',
          height: '3em',
          borderRadius: '1.5em',
          cursor: 'pointer',
          zIndex: '10000', // Leaflet uses up to 1000
        }}
        onClick={() => navigate(-1)}
      >
        <FontAwesomeIcon icon={faAngleLeft} color="white" />
      </div>
    </div>
  );
};

export default MapViewPage;
