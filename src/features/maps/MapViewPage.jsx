import { useHistory, useParams } from 'react-router';
import Hammer from 'react-hammerjs';
import stadtmitte from './data/stadtmitte.svg';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const MapViewPage = () => {
  const { map } = useParams();
  const history = useHistory();

  const mapImg = useRef(null);

  // Following event orders are possible for pinch:
  // pinchstart pinchend panstart panend
  // pinchstart pinchend panend
  // pinchstart pinchend

  const [mapPosBase, setMapPosBase] = useState({
    x: visualViewport.width / 2 - 935,
    y: visualViewport.height / 2 - 610,
    s: 1,
  });
  const [mapPosStart, setMapPosStart] = useState({ x: 0, y: 0 });

  const calcMapPos = (e) => ({
    x:
      e.center.x +
      e.scale * (mapPosBase.x + e.deltaX - mapPosStart.x - e.center.x),
    y:
      e.center.y +
      e.scale * (mapPosBase.y + e.deltaY - mapPosStart.y - e.center.y),
    s: mapPosBase.s * e.scale,
  });

  const getTransform = (pos) =>
    `translate(${pos.x + 'px'}, ${pos.y + 'px'}) scale(${pos.s})`;

  const onMapMove = (e) => {
    mapImg.current.style.transform = getTransform(calcMapPos(e));
  };
  const onMapStart = (e) => {
    setMapPosStart({ x: e.deltaX, y: e.deltaY });
  };
  const onMapEnd = (e) => {
    setMapPosBase(calcMapPos(e));
    setMapPosStart({ x: e.deltaX, y: e.deltaY });
  };

  return (
    <>
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
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: '#dad8c8',
          }}
        >
          <img
            ref={mapImg}
            src={stadtmitte}
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
          top: '1em',
          left: '1em',
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
    </>
  );
};

export default MapViewPage;
