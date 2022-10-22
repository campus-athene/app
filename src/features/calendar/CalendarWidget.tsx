import moment from 'moment';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Widget from '../home/Widget';
import { selectNextAppointment } from './calendarApi';
import DayView from './DayView';

const CalendarWidget = () => {
  const navigate = useNavigate();
  const nextApp = useSelector(selectNextAppointment());

  const nextDay = moment(nextApp?.timeStart).startOf('day');
  if (!nextApp) return null;

  const diff = nextDay.diff(
    moment().tz('Europe/Berlin').startOf('day'),
    'days'
  );
  const dayString = diff === 0 ? 'Heute' : diff === 1 ? 'Morgen' : null;
  if (dayString === null) return null;

  return (
    <Widget
      onClick={() => navigate(`/calendar?day=${nextDay.diff(0)}`)}
      style={{ overflow: 'hidden', padding: 0 }}
      title={dayString}
    >
      <DayView
        cropToContent
        hourHeight={2}
        day={nextDay.diff(0)}
        onClick={() => navigate(`/calendar?day=${nextDay.diff(0)}`)}
      />
    </Widget>
  );
};

export default CalendarWidget;
