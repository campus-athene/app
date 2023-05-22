import * as cn from '@campus/campusnet-sdk';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCNQuery, useWithSession } from '.';

const queryKey = ['messages'];

const useMessagesWithSelector = <TData>(
  select: (data: cn.Message[]) => TData
) =>
  useCNQuery<cn.Message[], unknown, TData, string[]>({
    queryKey,
    queryFn: async (session): Promise<cn.Message[]> =>
      (await cn.messages(session)).filter((m) => m.folder === 'inbox'),
    select,
  });

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
  const setMessageStatusWithSession = useWithSession(cn.setMessageStatus);

  const mutationFn = (args: QueryArgs) =>
    setMessageStatusWithSession(args.messageId, args.unread);

  return useMutation({
    mutationFn,
    onMutate: async ({ messageId, unread }: QueryArgs) => {
      await queryClient.cancelQueries({ queryKey });
      const previousMessages = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(
        queryKey,
        (messages?: cn.Message[]) =>
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

  const setStatusWithSession = useWithSession(cn.setMessageStatus);
  const messages = useMessages();

  return useMutation({
    mutationFn: async () =>
      messages.data &&
      Promise.all(
        messages.data
          .filter((m) => m.unread)
          .map((m) => setStatusWithSession(m.messageId, false))
      ),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousMessages = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(
        queryKey,
        (messages?: cn.Message[]) =>
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
