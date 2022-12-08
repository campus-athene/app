import moment, { utc } from 'moment';
import mainApi from '../../provider/tucan/tucanApi';
import { Appointment } from '../../provider/tucan/tucanApiTypes';
import { RootState } from '../../redux';
import { selectCreds } from '../auth/authSlice';

const selectAllAppointments =
  () =>
  (state: RootState): Appointment[] => {
    const creds = selectCreds()(state);
    if (!creds) return [];
    return mainApi.useAppointmentsQuery(null).data || [];
  };

export const selectAppointmentsOnDay =
  (day: number) =>
  (state: RootState): Appointment[] => {
    const from = day;
    const to = utc(day).add(1, 'day');
    return selectAllAppointments()(state).filter(
      (a) =>
        moment(a.timeStart).utcOffset(0, true).diff(to) < 0 &&
        moment(a.timeEnd).utcOffset(0, true).diff(from) >= 0
    );
  };

export const selectNextAppointment =
  () =>
  (state: RootState): Appointment | null => {
    const now = Date.now();
    return selectAllAppointments()(state).reduce<Appointment | null>((p, c) => {
      if (new Date(c.timeEnd).getTime() < now) return p;
      if (!p) return c;
      return new Date(c.timeStart).getTime() < new Date(p.timeStart).getTime()
        ? c
        : p;
    }, null);
  };
