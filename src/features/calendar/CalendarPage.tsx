import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IonButton, IonButtons } from '@ionic/react';
import moment from 'moment-timezone';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageFrame from '../../components/PageFrame';
import { getSession, UserNotLoggedInError } from '../../provider/camusnet';
import CampusNetLoginTeaser from '../auth/CampusNetLoginTeaser';
import DayView from './DayView';

const CalendarPage = () => {
  const location = useLocation();

  const [state, setState] = useState<'loading' | 'loaded' | 'error' | 'login'>(
    'loading',
  );
  useEffect(() => {
    getSession().then(
      () => setState('loaded'),
      (reason) =>
        setState(reason instanceof UserNotLoggedInError ? 'login' : 'error'),
    );
  }, []);

  const dayFromUrlStr = useMemo(
    () => new URLSearchParams(location.search).get('day'),
    [location.search],
  );
  const dayFromUrl = (dayFromUrlStr && Number.parseInt(dayFromUrlStr)) || null;

  const today = moment(Date.now())
    .tz('Europe/Berlin')
    .startOf('day')
    .utcOffset(0, true)
    .diff(0);
  const [selection, setSelection] = useState(dayFromUrl || today);

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
  if (state === 'login') return <CampusNetLoginTeaser title="Kalender" />;

  return (
    <PageFrame
      title={selectionString}
      className="flex flex-col bg-white"
      style={{
        // @ts-ignore
        '--background': '#fff',
      }}
      headerProps={{
        collapse: undefined,
      }}
      syncState={{
        isLoading: state === 'loading',
        isOffline: state === 'error',
      }}
      toolbarButtons={[
        <IonButtons slot="primary">
          <IonButton
            className="w-8"
            onClick={() => setSelection(moment(selection).add(1, 'd').diff(0))}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </IonButton>
        </IonButtons>,
        <IonButtons slot="secondary">
          <IonButton
            className="w-8"
            onClick={() => setSelection(moment(selection).add(-1, 'd').diff(0))}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </IonButton>
        </IonButtons>,
      ]}
    >
      <div className="flex-shrink overflow-y-scroll">
        <DayView autoScrollParent day={selection} />
      </div>
    </PageFrame>
  );
};

export default CalendarPage;
