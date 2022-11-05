import moment from 'moment';
import mainApi from '../../provider/tucan/tucanApi';
import { Appointment } from '../../provider/tucan/tucanApiTypes';
import { RootState } from '../../redux';

export const selectAppointmentsOnDay = (day: number) => (state: any) => {
  const from = day;
  const to = moment(day).add(1, 'day');
  return mainApi
    .useAppointmentsQuery(null)
    .data?.filter(
      (a) =>
        moment(a.timeStart).utcOffset(0, true).diff(to) < 0 &&
        moment(a.timeEnd).utcOffset(0, true).diff(from) >= 0
    );
};

export const selectNextDayWithAppointments = () => (state: RootState) => {
  const today = moment(Date.now()).tz('Europe/Berlin').startOf('day');
  const data = mainApi.useAppointmentsQuery(null).data;
  if (!data) return null;

  return Math.min(
    ...data.map((a) => today.diff(today, 'days')).filter((d) => d >= 0)
  );
};

export const selectNextAppointment = () => (state: RootState) => {
  const now = Date.now();
  return mainApi.useAppointmentsQuery(null).data?.reduce((p, c) => {
    if (new Date(c.timeEnd).getTime() < now) return p;
    if (!p) return c;
    return new Date(c.timeStart).getTime() < new Date(p.timeStart).getTime()
      ? c
      : p;
  }, null as Appointment | null);
};
