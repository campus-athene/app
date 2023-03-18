import * as cn from '@campus/campusnet-sdk';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useWithSession } from '.';

export type Message = {
  messageId: number;
  subject: string;
  body: string;
  sent: number;
  sentDateStr: string;
  sentTimeStr: string;
  folder: string;
  unread: boolean;
  from: string;
  to: string;
};

const queryKey = ['campusnet', 'messages'];

const useMessagesWithSelector = <TData>(select: (data: Message[]) => TData) => {
  const queryFn = useWithSession(cn.messages);

  return useQuery<Message[], unknown, TData, string[]>({
    queryKey,
    queryFn: async (): Promise<Message[]> =>
      (await queryFn()).filter((m) => m.folder === 'inbox'),
    select,
  });
};
export const useMessage = (id: number) =>
  useMessagesWithSelector((messages) =>
    messages.find((m) => m.folder === 'inbox' && m.messageId === id)
  );

export const useMessages = () =>
  useMessagesWithSelector((messages) =>
    messages.filter((m) => m.folder === 'inbox')
  );

export const useUnreadMessagesCount = () =>
  useMessagesWithSelector(
    (messages) =>
      messages.filter((m) => m.folder === 'inbox' && m.unread).length
  );

export const useSetMessageStatus = () => {
  type QueryArgs = { messageId: number; unread?: boolean };

  const queryClient = useQueryClient();
  const setMessageStatusWithSession = useWithSession(cn.setStatus);

  const mutationFn = (args: QueryArgs) =>
    setMessageStatusWithSession(args.messageId, !args.unread);

  return useMutation({
    mutationFn,
    onMutate: async ({ messageId, unread }: QueryArgs) => {
      await queryClient.cancelQueries({ queryKey });
      const previousMessages = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(
        queryKey,
        (messages?: Message[]) =>
          messages &&
          messages.map((m) =>
            m.messageId === messageId
              ? {
                  ...m,
                  unread: !!unread,
                }
              : m
          )
      );

      return { previousMessages };
    },
    onError: (err, messageId, context) => {
      queryClient.setQueryData(queryKey, context?.previousMessages);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export const useMarkAllMessagesRead = () => {
  const queryClient = useQueryClient();

  const setStatusWithSession = useWithSession(cn.setStatus);
  const messages = useMessages();

  return useMutation({
    mutationFn: async () =>
      messages.data &&
      Promise.all(
        messages.data
          .filter((m) => m.unread)
          .map((m) => setStatusWithSession(m.messageId, true))
      ),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousMessages = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(
        queryKey,
        (messages?: Message[]) =>
          messages &&
          messages.map((m) => ({
            ...m,
            unread: false,
          }))
      );

      return { previousMessages };
    },
    onError: (err, messageId, context) => {
      queryClient.setQueryData(queryKey, context?.previousMessages);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
