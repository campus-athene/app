import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

type Event = {
  id: number;
  title: string;
  organiser: { id: number; name: string; socialEmail: string | null };
  date: number;
  online: boolean;
  eventType: string;
  venue: string | null;
  venueAddress: string | null;
  venuePlaceId: string | null;
  registrationDeadline: number | null;
  registrationLink: string | null;
  price: string | null;
  desc: string;
  image: string;
};

const eventApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://events.study-campus.de/api',
  }),
  endpoints: (build) => ({
    highlights: build.query<Event[], null>({
      query: () => ({
        url: '/highlights',
      }),
      transformResponse(result: any) {
        localStorage.setItem(
          'eventHighlights',
          JSON.stringify(result.highlights)
        );
        return result.highlights;
      },
    }),
  }),
});

// Overwrite useHighlightsQuery to use data from local store until fresh data gets available.
eventApi.useHighlightsQuery = (arg, options) => {
  const query = eventApi.endpoints.highlights.useQuery(arg as any, options);

  if (query.data) return query;

  const cached = localStorage.getItem('eventHighlights');
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
  };
};

export default eventApi;
