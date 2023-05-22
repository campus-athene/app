import {
  AccessError,
  login,
  myDocuments,
  Session,
  set,
} from '@campus/campusnet-sdk';
import { CapacitorHttp } from '@capacitor/core';
import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import {
  selectCampusNetCreds,
  updateCampusNetCreds,
} from '../../features/auth/authSlice';
import { AppThunkAction } from '../../redux';
import { useAppDispatch } from '../../redux/hooks';

if (CapacitorHttp)
  // Use native http plugin to prevent CORS issues
  set('onRequest', async (info, url, init) => {
    const requestHeaders = new Headers(init.headers);
    if (init.body)
      requestHeaders.set('Content-Type', 'application/x-www-form-urlencoded');

    const response = await CapacitorHttp.request({
      data: init.body as string,
      disableRedirects: true,
      headers: Object.fromEntries(requestHeaders),
      method: init.method,
      responseType: 'text',
      url,
    });

    const responseHeaders = new Headers(response.headers);
    return {
      headers: {
        get: (name: string) => responseHeaders.get(name),
      },
      status: response.status,
      text: async () => response.data as string,
    };
  });

if (process.env.NODE_ENV === 'development')
  // During development the REACT_APP_CAMPUSNET_BASE_URL is used as proxy
  // target for /campusnet-proxy/scripts/mgrqispi.dll
  set('baseUrl', '/campusnet-proxy/scripts/mgrqispi.dll');
else if (process.env.REACT_APP_CAMPUSNET_BASE_URL)
  set(
    'baseUrl',
    process.env.REACT_APP_CAMPUSNET_BASE_URL + '/scripts/mgrqispi.dll'
  );

if (process.env.NODE_ENV === 'development') {
  set('cookieHeaderReceive', 'Safe-Set-Cookie');
  set('cookieHeaderSend', 'Safe-Cookie');
}

/** Promise that resolves to the current session. */
let sessionPromise: Promise<Session> | null = null;

export class UserNotLoggedInError extends Error {
  constructor() {
    super('The user is not logged in.');
  }
}

/**
 * Hook that returns a function that can be used to login.
 * The returned function returns null if the login was successful.
 * Otherwise it returns an error message.
 */
export const useLogin: () => (
  username: string,
  password: string
) => Promise<string | null> = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return async (username, password) => {
    // Todo: Prevent multiple simultaneous logins causing race-conditions.

    const loginPromise = login(username, password);
    // sessionPromise is set, so that other queries can await the login.
    // The difference between loginPromise and sessionPromise is that
    // loginPromise resolves to null if the credentials are invalid while
    // sessionPromise rejects with UserNotLoggedInError.
    sessionPromise = (async () => {
      const session = await loginPromise;
      if (session) return session;
      throw new UserNotLoggedInError();
    })();

    const session = await loginPromise;
    if (!session) {
      sessionPromise = null;
      return 'TU-Id oder Passwort falsch.';
    }

    // User has logged in successfully.

    // Invalidate all queries that failed because the user was not logged in.
    queryClient.invalidateQueries({
      predicate: (query) => query.state.error instanceof UserNotLoggedInError,
    });

    // Save credentials in state for later use.
    dispatch(updateCampusNetCreds({ creds: { username, password } }));

    // Return null to indicate that the login was successful.
    return null;
  };
};

/** Thunk action that retrieves credentials from state and uses these the create a new session. */
const createSession: () => AppThunkAction<Promise<Session>> =
  () => async (dispatch, getState) => {
    const creds = selectCampusNetCreds()(getState());
    if (!creds)
      // User has not logged in yet.
      throw new UserNotLoggedInError();

    const session = await login(creds.username, creds.password);
    if (!session)
      // Credentials are invalid.
      throw new UserNotLoggedInError();

    return session;
  };

/**
 * Hook that returns a function that resolves to a session.
 */
const useGetSession = () => {
  const dispatch = useAppDispatch();
  return () => sessionPromise || (sessionPromise = dispatch(createSession()));
};

/**
 * Hook that returns a function that calls a function that requires a session.
 * @argument func The function that requires a session.
 * @argument args The arguments that need to be passed to the function.
 */
export function useWithSession<TResult, TArgs extends unknown[]>(
  func: (session: Session, ...args: TArgs) => Promise<TResult>
): (...args: TArgs) => Promise<TResult> {
  const getSession = useGetSession();
  return async (...args) => {
    const currentSessionPromise = getSession();
    try {
      return await func(await currentSessionPromise, ...args);
    } catch (e) {
      if (e instanceof AccessError) {
        if (sessionPromise === currentSessionPromise) {
          console.log(`Dropping session due to AccessError of type ${e.type}.`);
          sessionPromise = null;
        }
        return await func(await getSession(), ...args);
      } else throw e;
    }
  };
}

export function useCNQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>({
  queryFn,
  queryKey,
  ...options
}: Omit<
  UseQueryOptions<TQueryFnData, TError, TData, [string, ...TQueryKey]>,
  'initialData' | 'queryFn' | 'queryKey'
> & {
  initialData?: () => undefined;
  queryFn: (session: Session) => Promise<TQueryFnData>;
  queryKey?: TQueryKey;
}): UseQueryResult<TData, TError> {
  const queryFnWithSession = useWithSession<TQueryFnData, []>(queryFn);
  return useQuery<TQueryFnData, TError, TData, [string, ...TQueryKey]>({
    retry: (failureCount, error) =>
      failureCount < 3 && !(error instanceof UserNotLoggedInError),
    ...options,
    queryFn: () => queryFnWithSession(),
    queryKey: queryKey && ['campusnet', ...queryKey],
  });
}

export const useDocuments = () => {
  return useCNQuery({
    queryKey: ['documents'],
    queryFn: myDocuments,
  });
};
