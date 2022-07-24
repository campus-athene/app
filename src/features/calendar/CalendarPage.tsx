import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment-timezone';
import { MouseEventHandler, useState } from 'react';
import PageFrame from '../common/PageFrame';
import DayView from './DayView';

const CalendarPage = () => {
  const today = moment(Date.now())
    .tz('Europe/Berlin')
    .startOf('day')
    .utcOffset(0, true)
    .diff(0);
  const [selection, setSelection] = useState(today);

  const getDateString = (date: number) => {
    const offset = moment(date).diff(today, 'd');
    const m = moment(date);

    if (offset === -1) return 'Gestern';
    if (offset === 0) return 'Heute';
    if (offset === 1) return 'Morgen';
    if (offset > 0 && offset <= 4) return m.format('dddd');
    if (offset > -60 && offset < 90) return m.format('ddd, D. MMMM');
    return m.format('ddd, D. MMM yy');
  };
  const selectionString = getDateString(selection);

  const NavButton = (props: {
    onClick?: MouseEventHandler;
    icon: IconProp;
    offset: number;
  }) => (
    <button
      onClick={() =>
        setSelection(moment(selection).add(props.offset, 'd').diff(0))
      }
      style={{
        background: 'none',
        border: 'none',
        color: '#FFF',
        fontSize: '1.25rem',
        height: '2.5rem',
        width: '2.5rem',
      }}
    >
      <FontAwesomeIcon icon={props.icon} />
    </button>
  );

  return (
    <PageFrame
      title="Kalender"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <div
        style={{
          backgroundColor: '#372649',
          color: '#FFF',
          display: 'flex',
          marginTop: '-0.5em',
        }}
      >
        <NavButton icon={faAngleLeft} offset={-1} />
        <div
          style={{
            flexGrow: 1,
            flexShrink: 1,
            lineHeight: '1',
            overflow: 'hidden',
            padding: '0.75em 0',
            textAlign: 'center',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {selectionString}
        </div>
        <NavButton icon={faAngleRight} offset={1} />
      </div>
      <div style={{ flexShrink: 1, overflow: 'scroll' }}>
        <DayView autoScrollParent day={selection} />
      </div>
    </PageFrame>
  );
};

export default CalendarPage;
