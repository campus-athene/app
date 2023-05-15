import { useQuery } from '@tanstack/react-query';
import { selectMoodleToken } from '../../features/auth/authSlice';
import { useAppStore } from '../../redux/hooks';
import { CoreSiteInfoResponse } from './types';

const baseQueryKey = ['moodle'];

type QueryArg = {
  wsFunction: string;
  body?: {
    [key: string]: string | number | boolean;
  };
};

const useRequest = <TResult>(arg: QueryArg) => {
  const { getState } = useAppStore();

  return async (): Promise<TResult> => {
    const wsToken = selectMoodleToken()(getState());
    if (!wsToken) throw new Error('No moodle token found.');

    const body = {
      wsfunction: arg.wsFunction,
      wstoken: wsToken,
      ...arg.body,
    };

    return await (
      await fetch(
        'https://moodle.tu-darmstadt.de/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=' +
          arg.wsFunction,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: Object.entries(body)
            .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
            .join('&'),
        }
      )
    ).json();
  };
};

export const useCoreWebserviceGetSiteInfo = () => {
  const queryFn = useRequest<CoreSiteInfoResponse>({
    wsFunction: 'core_webservice_get_site_info',
  });
  return useQuery({
    queryKey: [baseQueryKey, 'core_webservice_get_site_info'],
    queryFn,
  });
};
