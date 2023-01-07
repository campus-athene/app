import {
  Session,
  login,
  messages,
  myDocuments,
  set,
} from '@campus/campusnet-sdk';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  selectCampusNetCreds,
  updateCampusNetCreds,
} from '../../features/auth/authSlice';
import { AppThunkAction } from '../../redux';
import { useAppDispatch } from '../../redux/hooks';
import { MessagesResult } from '../tucan/apiTypes';

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
 * Hook that returns a function that calls a function that requires a session.
 * @argument func The function that requires a session.
 * @argument args The arguments that need to be passed to the function.
 */
function useWithSession<TResult, TArgs extends []>(
  func: (session: Session, ...args: TArgs) => Promise<TResult>,
  ...args: TArgs
): () => Promise<TResult> {
  const dispatch = useAppDispatch();

  return async () => {
    if (!sessionPromise) sessionPromise = dispatch(createSession());
    return func(await sessionPromise, ...args);
  };
}

export const useDocuments = () => {
  const queryFn = useWithSession(myDocuments);
  return useQuery({
    queryKey: ['campusnet', 'documents'],
    queryFn,
  });
};

export const useMessages = () => {
  const queryFn = useWithSession(messages);

  return useQuery({
    queryKey: ['campusnet', 'messages'],
    queryFn: async (): Promise<MessagesResult['messages']> =>
      (await queryFn())
        .filter((m) => m.folder === 'inbox')
        .map((m) => ({
          id: m.messageId,
          subject: m.subject,
          body: m.body,
          date: m.sentDateStr,
          time: m.sentTimeStr,
          unread: m.unread,
          from: m.from,
        })),
  });
};
