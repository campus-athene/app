import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { ImageOverlay, MapContainer, TileLayer } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { log } from '../../app/errorReporting';
import { selectStatusBarHeightCss } from '../../redux/globalSlice';
import lichtwiese from './data/lichtwiese.png';
import stadtmitte from './data/stadtmitte.png';

const getMapData = (mapArg) => {
  return mapArg === 'stadtmitte'
    ? {
        url: stadtmitte,
        bounds: [
          [49.8846, 8.6367],
          [49.8655, 8.6666],
        ],
        center: [49.8758, 8.6568],
        zoom: 16,
      }
    : mapArg === 'lichtwiese'
    ? {
        url: lichtwiese,
        bounds: [
          [49.8571, 8.6885],
          [49.8716, 8.6636],
        ],
        center: [49.86, 8.681],
        zoom: 15,
      }
    : mapArg === 'botanischergarten'
    ? {
        url: lichtwiese,
        bounds: [
          [49.8571, 8.6885],
          [49.8716, 8.6636],
        ],
        center: [49.868, 8.681],
        zoom: 16,
      }
    : mapArg === 'hochschulstadion'
    ? {
        url: lichtwiese,
        bounds: [
          [49.8571, 8.6885],
          [49.8716, 8.6636],
        ],
        center: [49.86, 8.672],
        zoom: 16,
      }
    : // : mapArg === 'windkanal'
      // ? {
      //     url: windkanal,
      //     bounds: [
      //       [49.8547, 8.6001], // 49.854718, 8.584159
      //       [49.8662, 8.5842],
      //     ],
      //     center: [49.86, 8.592],
      //     zoom: 16,
      //   }
      log('warning', `MapViewPage was parsed an invalid map parameter.`, {
        map: mapArg,
      }) || {
        url: stadtmitte,
        bounds: [
          [49.8846, 8.6367],
          [49.8655, 8.6666],
        ],
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
  const map = getMapData(mapArg);
  const navigate = useNavigate();

  return (
    <div className="h-screen relative bg-cyan-200">
      <MapContainer
        className="bg-[#aaa] absolute inset-0"
        center={map.center}
        zoom={map.zoom}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; TU Darmstadt, <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ImageOverlay url={map.url} bounds={map.bounds} />
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
