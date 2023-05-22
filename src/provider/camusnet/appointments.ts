import * as cn from '@campus/campusnet-sdk';
import { utc } from 'moment-timezone';
import { useCNQuery } from '.';

const queryKey = ['appointments'];

const useAppointmentsWithSelector = <TData>(
  select?: (data: cn.Appointment[]) => TData
) =>
  useCNQuery<cn.Appointment[], unknown, TData, string[]>({
    queryKey,
    queryFn: cn.myAppointments,
    select,
  });

export const useAppointmentsOnDay = (day: number) => {
  const from = day;
  const to = utc(day).add(1, 'day');
  return useAppointmentsWithSelector((appointments) =>
    appointments.filter(
      (a) => utc(a.timeStart).diff(to) < 0 && utc(a.timeEnd).diff(from) >= 0
    )
  );
};

export const useNextAppointment = () => {
  const now = Date.now();
  return useAppointmentsWithSelector((appointments) =>
    appointments.reduce<cn.Appointment | null>((p, c) => {
      if (utc(c.timeEnd).diff(now) < 0) return p;
      if (!p) return c;
      return utc(c.timeStart).diff(utc(p.timeStart)) < 0 ? c : p;
    }, null)
  );
};
