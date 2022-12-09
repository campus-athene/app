import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleLeft,
  faAngleRight,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment-timezone';
import { MouseEventHandler, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { ContextMenuItem } from '../../components/ContextMenu';
import PageFrame from '../../components/PageFrame';
import canteenData from './canteenData';
import {
  canteenFriendlyName,
  selectCanteen,
  setCanteen,
} from './canteenSettings';
import DishTypeImage from './DishTypeImage';
import foodPlaceholderSq from './foodPlaceholderSq.svg';
import Star from './Star';

const CanteenPage = () => {
  const canteenId = useSelector(selectCanteen());

  const dayFromUrlStr = useSearchParams()[0].get('day');
  const dayFromUrl = (dayFromUrlStr && Number.parseInt(dayFromUrlStr)) || null;

  const today = moment(Date.now())
    .tz('Europe/Berlin')
    .startOf('day')
    .utcOffset(0, true);

  const [selection, setSelection] = useState(
    () =>
      dayFromUrl ||
      // If it is weekend today select next Monday by default
      (today.isoWeekday() === 6
        ? today.add('2', 'd')
        : today.isoWeekday() === 7
        ? today.add('1', 'd')
        : today
      ).diff(0)
  );

  const offset = moment(selection).diff(today, 'd');

  const selectionString =
    offset === 0
      ? 'Heute'
      : offset === 1
      ? 'Morgen'
      : offset > 0 && offset <= 6
      ? moment(selection).format('dddd')
      : moment(selection).format('dddd, D. MMM');

  const { data } = canteenData.useMenuItemsQuery({ canteenId, days: 14 });

  const ContextMenu = () => {
    const dispatch = useDispatch();
    return (
      <>
        <ContextMenuItem onClick={() => dispatch(setCanteen('1'))}>
          <FontAwesomeIcon
            icon={faCheck}
            style={{
              marginRight: '0.5em',
              visibility: canteenId === '1' ? 'visible' : 'hidden',
            }}
          />
          Stadtmitte
        </ContextMenuItem>
        <ContextMenuItem onClick={() => dispatch(setCanteen('2'))}>
          <FontAwesomeIcon
            icon={faCheck}
            style={{
              marginRight: '0.5em',
              visibility: canteenId === '2' ? 'visible' : 'hidden',
            }}
          />
          Lichtwiese
        </ContextMenuItem>
      </>
    );
  };

  const NavButton = (props: {
    onClick?: MouseEventHandler;
    icon: IconProp;
    offset: number;
  }) => {
    var newDate = moment(selection).add(props.offset, 'd');
    if (newDate.isoWeekday() === 6) newDate.add(2, 'd');
    if (newDate.isoWeekday() === 7) newDate.add(-2, 'd');

    const relToToday = newDate.diff(today, 'd');
    const enabled =
      !(props.offset < 0 && relToToday < 0) &&
      !(props.offset > 0 && relToToday > 13);

    return (
      <button
        onClick={
          enabled
            ? () => {
                setSelection(newDate.diff(0));
              }
            : undefined
        }
        style={{
          background: 'none',
          border: 'none',
          color: '#FFF',
          fontSize: '1.25rem',
          height: '2.5rem',
          opacity: enabled ? undefined : '0.5',
          width: '2.5rem',
        }}
      >
        <FontAwesomeIcon icon={props.icon} />
      </button>
    );
  };

  return (
    <PageFrame
      title={canteenFriendlyName[canteenId]}
      more={<ContextMenu />}
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
        {data?.menuItems
          .filter((m) => m.date === selection / 1000)
          .map((m) => (
            <div
              className="flex h-24"
              key={m.id}
              style={{
                borderBottom: '1px solid lightgray',
              }}
            >
              <div className="relative w-24 flex-shrink-0">
                <img
                  alt=""
                  className="absolute h-auto w-24 object-cover"
                  src={foodPlaceholderSq}
                />
                <img
                  alt=""
                  className="absolute h-full w-24 object-cover"
                  src={m.dish.image?.thumbUrl}
                />
              </div>
              <div className="flex flex-grow flex-col  px-2.5 py-2 text-sm">
                <div className="flex items-baseline">
                  <div className="flex flex-shrink-0 gap-0.5">
                    <Star shine={true} />
                    <Star shine={m.dish.rating > 1} />
                    <Star shine={m.dish.rating > 2} />
                    <Star shine={m.dish.rating > 3} />
                    <Star shine={m.dish.rating > 4} />
                  </div>
                  <span className="flex-grow text-center text-xs font-semibold">
                    {[...m.dish.additionals, ...m.dish.allergics].join(' ')}
                  </span>
                  <div
                    style={{
                      alignSelf: 'start',
                      height: '1.25em',
                      width: '1.25em',
                    }}
                  >
                    <DishTypeImage type={m.dish.type} />
                  </div>
                  <div style={{ minWidth: '3em', textAlign: 'right' }}>
                    {new Intl.NumberFormat('de-DE', {
                      style: 'currency',
                      currency: 'EUR',
                    }).format(m.dish.price)}
                  </div>
                </div>
                <span>{m.issuingOffice.name}</span>
                <span className="font-medium line-clamp-2">{m.dish.name}</span>
              </div>
            </div>
          ))}
      </div>
    </PageFrame>
  );
};

export default CanteenPage;
