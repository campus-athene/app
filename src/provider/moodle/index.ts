import { Capacitor, CapacitorHttp } from '@capacitor/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import {
  selectMoodlePrivateToken,
  selectMoodleToken,
} from '../../features/auth/authSlice';
import { useAppStore } from '../../redux/hooks';
import {
  AddonNotificationsGetMessagesWSParams,
  AddonNotificationsGetMessagesWSResponse,
  AddonNotificationsNotificationMessage,
  CoreCourseGetEnrolledCoursesByTimelineClassificationWSResponse,
  CoreSiteAutologinKeyResult,
  CoreSiteInfoResponse,
} from './types';

const baseQueryKey = ['moodle'];

type QueryArg = {
  wsFunction: string;
  body?: {
    [key: string]: string | number | boolean;
  };
};

const useRequest = <TResult>(arg: QueryArg) => {
  const withLateArg = useRequestWithLateArg<TResult>();
  return () => withLateArg(arg);
};
const useRequestWithLateArg = <TResult>() => {
  const { getState } = useAppStore();

  return async (arg: QueryArg): Promise<TResult> => {
    const wsToken = selectMoodleToken()(getState());
    if (!wsToken) throw new Error('No moodle token found.');

    const body = {
      moodlewsrestformat: 'json',
      wsfunction: arg.wsFunction,
      wstoken: wsToken,
      ...arg.body,
    };

    return Capacitor.isNativePlatform()
      ? (
          await CapacitorHttp.request({
            url: 'https://moodle.tu-darmstadt.de/webservice/rest/server.php',
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'User-Agent': 'MoodleMobile 4.3.0 (43000)',
            },
            data: Object.entries(body)
              .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
              .join('&'),
            responseType: 'json',
          })
        ).data
      : (
          await fetch(
            'https://moodle.tu-darmstadt.de/webservice/rest/server.php',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: Object.entries(body)
                .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
                .join('&'),
            },
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

export const useCoreMessageGetMessages = (
  params: Partial<AddonNotificationsGetMessagesWSParams>,
) => {
  const userId = useCoreWebserviceGetSiteInfo().data?.userid;
  const boolToNum = (b: boolean | undefined) =>
    b === false ? 0 : b === true ? 1 : undefined;
  const body: AddonNotificationsGetMessagesWSParams | {} =
    typeof userId === 'number'
      ? {
          useridto: userId,
          ...params,
          newestfirst: boolToNum(params.newestfirst),
        }
      : {};

  const queryFn = useRequest<AddonNotificationsGetMessagesWSResponse>({
    wsFunction: 'core_message_get_messages',
    body,
  });

  return useQuery({
    queryKey: [baseQueryKey, 'core_message_get_messages', params],
    queryFn,
    enabled: !!userId,
  });
};

export const useCoreMessageMarkNotificationRead = () => {
  const mutationFn = useRequestWithLateArg();

  const queryClient = useQueryClient();
  const queryKey = [baseQueryKey, 'core_message_get_messages'];

  return useMutation({
    mutationFn: (notificationId: number) =>
      mutationFn({
        wsFunction: 'core_message_mark_notification_read',
        body: {
          notificationid: notificationId,
        },
      }),
    onMutate: async (messageId: number) => {
      await queryClient.cancelQueries({ queryKey });
      const previousMessages = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(
        queryKey,
        (messages?: AddonNotificationsNotificationMessage[]) =>
          messages &&
          messages.map((m) =>
            m.id === messageId
              ? {
                  ...m,
                  read: true,
                }
              : m,
          ),
      );

      return { previousMessages };
    },
    onError: (err, notificationId, context) => {
      queryClient.setQueryData(queryKey, context?.previousMessages);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export const useCoreMessageMarkAllNotificationsAsRead = () => {
  const userId = useCoreWebserviceGetSiteInfo().data?.userid;
  const mutationFn = useRequestWithLateArg();

  const queryClient = useQueryClient();
  const queryKey = [baseQueryKey, 'core_message_get_messages'];

  return useMutation({
    mutationFn: async () =>
      userId &&
      (await mutationFn({
        wsFunction: 'core_message_mark_all_notifications_as_read',
        body: {
          useridto: userId,
        },
      })),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousMessages = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(
        queryKey,
        (messages?: AddonNotificationsNotificationMessage[]) =>
          messages &&
          messages.map((m) =>
            m.timeread !== null
              ? {
                  ...m,
                  timeread: Date.now() / 1000,
                }
              : m,
          ),
      );

      return { previousMessages };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKey, context?.previousMessages);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export const useCoreCoursesGetCourses = (params: {
  classification: 'all' | 'inprogress' | 'future' | 'past';
}) => {
  const queryFn =
    useRequest<CoreCourseGetEnrolledCoursesByTimelineClassificationWSResponse>({
      wsFunction: 'core_course_get_enrolled_courses_by_timeline_classification',
      body: {
        classification: params.classification,
      },
    });
  return useQuery({
    queryKey: [
      baseQueryKey,
      'core_course_get_enrolled_courses_by_timeline_classification',
      params,
    ],
    queryFn,
  });
};

export const useToolMobileGetAutologinKey = () => {
  const privatetoken = useSelector(selectMoodlePrivateToken());
  if (!privatetoken) throw new Error('No moodle private token found.');

  const queryFn = useRequest<CoreSiteAutologinKeyResult>({
    wsFunction: 'tool_mobile_get_autologin_key',
    body: {
      privatetoken,
    },
  });
  return useQuery({
    queryKey: [baseQueryKey, 'tool_mobile_get_autologin_key'],
    queryFn,
    staleTime: 360000, // Max one request per hour is permitted.
    cacheTime: 3600000,
  });
};
