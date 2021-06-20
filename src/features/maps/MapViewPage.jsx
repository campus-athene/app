import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import Hammer from 'react-hammerjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import stadtmitte from './data/stadtmitte.png';
import lichtwiese from './data/lichtwiese.png';
import windkanal from './data/windkanal.png';
import { selectStatusBarHeightCss } from '../common/commonSlice';

const MapViewPage = () => {
  const statusBarHeightCss = useSelector(selectStatusBarHeightCss());

  const { map: mapArg } = useParams();
  const [mapSource, initialPos] =
    mapArg === 'stadtmitte'
      ? [stadtmitte, { x: 935, y: 610 }]
      : mapArg === 'lichtwiese'
      ? [lichtwiese, { x: 895, y: 920 }]
      : mapArg === 'botanischergarten'
      ? [lichtwiese, { x: 905, y: 240 }]
      : mapArg === 'hochschulstadion'
      ? [lichtwiese, { x: 440, y: 960 }]
      : mapArg === 'windkanal'
      ? [windkanal, { x: 250, y: 500 }]
      : console.warn(`Map four ${mapArg} could not be found.`) || [
          stadtmitte,
          { x: 935, y: 610 },
        ];
  const history = useHistory();

  const mapImg = useRef(null);
  const requestRef = useRef();

  // Following event orders are possible for pinch:
  // pinchstart pinchend panstart panend
  // pinchstart pinchend panend
  // pinchstart pinchend

  const [mapPosBase, setMapPosBase] = useState({
    x: visualViewport.width / 2 - initialPos.x,
    y: visualViewport.height / 2 - initialPos.y,
    s: 1,
  });
  const [mapPosStart, setMapPosStart] = useState({ x: 0, y: 0 });
  const mapPosCurrent = useRef(mapPosBase);

  const limitScale = (s) => Math.max(Math.min(s, 4), 0.3);
  const calcMapPos = (e) => ({
    x:
      e.center.x +
      (limitScale(mapPosBase.s * e.scale) / mapPosBase.s) *
        (mapPosBase.x + e.deltaX - mapPosStart.x - e.center.x),
    y:
      e.center.y +
      (limitScale(mapPosBase.s * e.scale) / mapPosBase.s) *
        (mapPosBase.y + e.deltaY - mapPosStart.y - e.center.y),
    s: limitScale(mapPosBase.s * e.scale),
  });

  const getTransform = (pos) =>
    `translate(${pos.x + 'px'}, ${pos.y + 'px'}) scale(${pos.s})`;

  const callback = () => {
    requestRef.current = null;
    if (!mapImg.current) return;
    mapImg.current.style.transform = getTransform(mapPosCurrent.current);
  };

  const onMapMove = (e) => {
    mapPosCurrent.current = calcMapPos(e);
    if (!requestRef.current)
      requestRef.current = requestAnimationFrame(callback);
  };
  const onMapStart = (e) => {
    setMapPosStart({ x: e.deltaX, y: e.deltaY });
  };
  const onMapEnd = (e) => {
    setMapPosBase(calcMapPos(e));
    setMapPosStart({ x: e.deltaX, y: e.deltaY });
  };

  return (
    <div style={{ height: '100vh' }}>
      <Hammer
        onPan={onMapMove}
        onPinch={onMapMove}
        onPanStart={onMapStart}
        onPinchStart={onMapStart}
        onPanEnd={onMapEnd}
        onPanCancel={onMapEnd}
        onPinchEnd={onMapEnd}
        onPinchCancel={onMapEnd}
        options={{
          recognizers: {
            pinch: { enable: true },
          },
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#dad8c8',
          }}
        >
          <img
            ref={mapImg}
            src={mapSource}
            alt="Karte"
            style={{
              transform: getTransform(mapPosBase),
              transformOrigin: 'top left',
              width: '83.55em',
            }}
          />
        </div>
      </Hammer>
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
        }}
        onClick={() => history.goBack()}
      >
        <FontAwesomeIcon icon={faAngleLeft} color="white" />
      </div>
    </div>
  );
};

export default MapViewPage;
