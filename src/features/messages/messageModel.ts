import * as CN from '@campus/campusnet-sdk';
import {
  useMarkAllMessagesRead as useCNMarkAllMessagesRead,
  useMessages as useCNMessages,
} from '../../provider/camusnet/messages';
import {
  useCoreMessageGetMessages,
  useCoreMessageMarkAllNotificationsAsRead,
} from '../../provider/moodle';
import {
  AddonNotificationsGetReadType,
  AddonNotificationsNotificationMessage,
} from '../../provider/moodle/types';

export type Message = {
  id: number;
  source: 'moodle' | 'campusnet';
  sender: string;
  subject: string;
  preview: string;
  sent: number;
  read: boolean;
};

export const useMessages = (): {
  data: Message[] | undefined;
  error: unknown;
  isError: boolean;
  isLoading: boolean;
} => {
  const msgQueryCampusNet = useCNMessages();
  // Api does not return expected result if querying for both read and unread messages in one request
  const msgQueryMoodleUnread = useCoreMessageGetMessages({
    useridfrom: 0,
    newestfirst: true,
    read: AddonNotificationsGetReadType.UNREAD,
    type: 'notifications',
    limitfrom: 0,
    limitnum: 20,
  });
  const msgQueryMoodleRead = useCoreMessageGetMessages({
    useridfrom: 0,
    newestfirst: true,
    read: AddonNotificationsGetReadType.READ,
    type: 'notifications',
    limitfrom: 0,
    limitnum: 20,
  });

  const mapCNMsg = (m: CN.Message): Message => ({
    id: m.messageId,
    source: 'campusnet',
    sender: m.from === 'System' ? 'Ankündigungen' : m.from,
    subject: m.subject,
    preview: m.body, // Must be parsed
    sent: m.sent,
    read: !m.unread,
  });
  const mapMoodleMsg = (m: AddonNotificationsNotificationMessage): Message => ({
    id: m.id,
    source: 'moodle',
    sender: m.userfromfullname,
    subject: m.subject, // Might be empty
    preview: m.fullmessagehtml,
    sent: m.timecreated * 1000,
    read: m.timeread !== null,
  });

  return {
    data:
      msgQueryCampusNet.data ||
      msgQueryMoodleUnread.data ||
      msgQueryMoodleRead.data
        ? [
            msgQueryCampusNet.data?.map(mapCNMsg) || [],
            msgQueryMoodleUnread.data?.messages.map(mapMoodleMsg) || [],
            msgQueryMoodleRead.data?.messages.map(mapMoodleMsg) || [],
          ]
            .flat()
            .sort((a, b) => b.sent - a.sent)
        : undefined,
    isError:
      msgQueryCampusNet.isError ||
      msgQueryMoodleUnread.isError ||
      msgQueryMoodleRead.isError,
    error:
      msgQueryCampusNet.error ||
      msgQueryMoodleUnread.error ||
      msgQueryMoodleRead.error,
    isLoading:
      msgQueryCampusNet.isLoading ||
      msgQueryMoodleUnread.isLoading ||
      msgQueryMoodleRead.isLoading,
  };
};

export const useUnreadMessagesCount = () => {
  const msgQueryCampusNet = useCNMessages();
  const msgQueryMoodle = useCoreMessageGetMessages({
    useridfrom: 0,
    newestfirst: true,
    read: AddonNotificationsGetReadType.UNREAD,
    type: 'notifications',
    limitfrom: 0,
    limitnum: 20, // Todo: Get count of all messages without retrieving them
  });

  return {
    data:
      msgQueryCampusNet.data && msgQueryMoodle.data
        ? msgQueryCampusNet.data.filter((m) => m.unread).length +
          // Moodle does not need to be filtered, because we only query unread messages
          msgQueryMoodle.data.messages.length
        : undefined,
    isError: msgQueryCampusNet.isError || msgQueryMoodle.isError,
    error: msgQueryCampusNet.error || msgQueryMoodle.error,
    isLoading: msgQueryCampusNet.isLoading || msgQueryMoodle.isLoading,
  };
};

export const useMarkAllMessagesRead = () => {
  const markAllReadCampusNet = useCNMarkAllMessagesRead();
  const markAllReadMoodle = useCoreMessageMarkAllNotificationsAsRead();

  return () =>
    Promise.all([
      markAllReadCampusNet.mutateAsync(),
      markAllReadMoodle.mutateAsync(),
    ]);
};
