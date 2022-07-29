import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { session } from '../api';
import { Appointment } from './mainApiTypes';

const mainApi = createApi({
  async baseQuery(arg, api) {
    try {
      return {
        data: await new session((api.getState() as any).auth.creds).send(
          arg.url
        ),
      };
    } catch (e) {
      return {
        error: e,
      };
    }
  },
  endpoints: (build) => ({
    appointments: build.query<Appointment[], null>({
      query: () => ({ url: '/tucan/appointments' }),
      transformResponse(result: { appointments: Appointment[] }) {
        localStorage.setItem(
          'appointments',
          JSON.stringify(result.appointments)
        );
        return result.appointments;
      },
    }),
  }),
});

// Overwrite useEndpointNameQuery to use data from local store until fresh data gets available.
Object.keys(mainApi.endpoints).forEach((key) => {
  const endpoint = key as keyof typeof mainApi.endpoints;
  const capitalized = (endpoint[0].toUpperCase() +
    endpoint.substring(1)) as Capitalize<keyof typeof mainApi.endpoints>;

  mainApi[`use${capitalized}Query`] = (arg, options) => {
    const query = mainApi.endpoints[endpoint].useQuery(arg, options);

    if (query.data) return query;

    const cached = localStorage.getItem(endpoint);
    if (!cached) return query;

    let data: any[];
    try {
      data = JSON.parse(cached);
    } catch (_) {
      return query;
    }

    return {
      ...query,
      data,
      refetch() {},
    };
  };
});

export const usePreload = () => {
  Object.keys(mainApi.endpoints).forEach((e) => {
    mainApi.usePrefetch(e as keyof typeof mainApi.endpoints)(null);
  });
};

export default mainApi;
