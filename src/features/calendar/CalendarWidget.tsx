import moment from 'moment';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Widget from '../common/Widget';
import { selectNextAppointment } from './calendarApi';
import DayView from './DayView';

const CalendarWidget = () => {
  const navigate = useNavigate();
  const nextApp = useSelector(selectNextAppointment());
  const nextDay = moment(nextApp?.timeStart).startOf('day');

  if (!nextApp || nextDay.diff(moment(Date.now()).startOf('day'), 'days') > 1)
    return null;

  return (
    <Widget
      onClick={() => navigate(`/calendar?day=${nextDay.diff(0)}`)}
      style={{ overflow: 'hidden', padding: 0 }}
    >
      <DayView cropToContent hourHeight={2} day={nextDay.diff(0)} />
    </Widget>
  );
};

export default CalendarWidget;
