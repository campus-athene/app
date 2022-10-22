import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectAppointmentsOnDay } from './calendarApi';

const DayView = (props: {
  autoScrollParent?: boolean;
  cropToContent?: boolean;
  day: number;
  hourHeight?: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}) => {
  const apps = useSelector(selectAppointmentsOnDay(props.day));

  const msPerHour = 3600000; // 60 * 60 * 1000 ms per hour
  const padding = 0.9;
  const hourSize = props.hourHeight || 3;

  const getTimeOfDay = (date: string | number | Date) => {
    const dateObj = new Date(date);
    // 24 * 60 * 60 * 1000 = 86400000 ms per day
    return (dateObj.getTime() - dateObj.getTimezoneOffset() * 60000) % 86400000;
  };

  const firstAppointmentOffset =
    apps && apps.length
      ? Math.min(...apps.map((a) => getTimeOfDay(a.timeStart))) /
        (msPerHour / hourSize)
      : undefined;
  const lastAppointmentOffset =
    apps &&
    Math.max(...apps.map((a) => getTimeOfDay(a.timeEnd))) /
      (msPerHour / hourSize);
  const midnightOffset =
    (props.cropToContent && firstAppointmentOffset
      ? firstAppointmentOffset * -1
      : 0) + padding;
  const autoScrollOffset =
    (typeof firstAppointmentOffset === 'number'
      ? firstAppointmentOffset
      : 8 * hourSize) +
    midnightOffset -
    padding;
  const viewHeight = props.cropToContent
    ? typeof firstAppointmentOffset === 'number' &&
      typeof lastAppointmentOffset === 'number'
      ? lastAppointmentOffset - firstAppointmentOffset + 2 * padding
      : undefined
    : hourSize * 24 + 2 * midnightOffset;

  const containerRef = useRef<HTMLDivElement>(null);
  (window as any).coref = containerRef.current;

  useEffect(() => {
    if (props.autoScrollParent)
      containerRef.current?.parentElement?.scroll(
        0,
        autoScrollOffset *
          parseFloat(getComputedStyle(containerRef.current).fontSize)
      );
  }, [autoScrollOffset, props.autoScrollParent]);

  if (!viewHeight) return null;

  return (
    <div
      onClick={props.onClick}
      ref={containerRef}
      style={{
        height: `${viewHeight}em`,
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        ...props.style,
      }}
    >
      {Array.from({ length: 25 }, (_x, i) => (
        <React.Fragment key={i}>
          <div
            style={{
              color: 'darkgray',
              fontSize: '0.8rem',
              lineHeight: '100%',
              position: 'absolute',
              textAlign: 'right',
              top: `${i * hourSize + midnightOffset - 0.3}rem`,
              width: '3em',
            }}
          >
            {i}:00
          </div>
          <div
            style={{
              background: 'darkgray',
              height: '1px',
              position: 'absolute',
              inset: `${i * hourSize + midnightOffset}em 0 auto 3em`,
            }}
          />
        </React.Fragment>
      ))}
      {apps?.map((app) => (
        <div
          key={app.id}
          style={{
            backgroundColor: '#BADEFF',
            border: '1px solid #5FB2FF',
            borderRadius: '0.5em',
            color: '#1790FF',
            height: `${
              (new Date(app.timeEnd).getTime() -
                new Date(app.timeStart).getTime()) /
              (msPerHour / hourSize)
            }em`,
            inset: `${
              getTimeOfDay(app.timeStart) / (msPerHour / hourSize) +
              midnightOffset
            }em 0.5em auto 3.5em`,
            overflow: 'hidden',
            padding: '0.125em 0.25em',
            position: 'absolute',
          }}
        >
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {app.name}
          </div>
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {app.room} | {app.instructor}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DayView;
