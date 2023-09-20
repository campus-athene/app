import moment from 'moment';
import { useHistory } from 'react-router-dom';
import pageRoutes from '../../app/pageRoutes';
import { useNextAppointment } from '../../provider/camusnet/appointments';
import Widget from '../home/Widget';
import DayView from './DayView';

const { utc } = moment;

const CalendarWidget = () => {
  const history = useHistory();

  const nextApp = useNextAppointment().data;
  if (!nextApp) return null;

  /** Next day on which there is an appointment. */
  const nextDay = moment(nextApp.timeStart).utcOffset(0, true).startOf('day');

  /** Amount of days nextDay is away from today. */
  const diff = nextDay.diff(utc().startOf('day'), 'days');

  const dayString = diff === 0 ? 'Heute' : diff === 1 ? 'Morgen' : null;
  if (dayString === null) return null;

  return (
    <Widget
      onClick={() => history.push(pageRoutes.calendar(nextDay.diff(0)))}
      style={{ overflow: 'hidden', padding: 0 }}
      title={dayString}
    >
      <DayView
        cropToContent
        hourHeight={2}
        day={nextDay.diff(0)}
        onClick={() => history.push(pageRoutes.calendar(nextDay.diff(0)))}
      />
    </Widget>
  );
};

export default CalendarWidget;
