import { Badge } from '@capawesome/capacitor-badge';
import { createSlice } from '@reduxjs/toolkit';
import { session } from '../../api';
import { log } from '../../errorReporting';
import { AppThunkAction, RootState } from '../../redux';
import { selectCreds } from '../auth/authSlice';

export type Message = {
  id: number;
  subject: string;
  body: string;
  date: string;
  time: string;
  unread: boolean;
  from: string;
};

const loadState = () => {
  const items = {} as { [id: number]: Message };
  try {
    const stored = localStorage.getItem('messages');
    if (stored) JSON.parse(stored).forEach((m: Message) => (items[m.id] = m));
  } catch (e) {
    log('error', 'messagesSlice.loadState threw an error.', e);
  }
  return { items, status: 'restored' };
};

const saveState = (state: RootState[typeof messagesSlice['name']]) =>
  localStorage.setItem('messages', JSON.stringify(Object.values(state.items)));

const updateBadge = async (count: number) => {
  try {
    await Badge.set({ count });
  } catch (error) {
    log('warning', 'Error updating badge.', error);
  }
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { items: {} as { [id: number]: Message }, status: 'initial' },
  reducers: {
    setStatus(state, { payload }: { payload: string }) {
      state.status = payload;
    },
    reset(state, { payload }: { payload: { messages: Message[] } }) {
      state.items = {};
      payload.messages.forEach((m) => (state.items[m.id] = m));
      saveState(state);
      updateBadge(selectUnreadCount()({ messages: state }));
    },
    markRead(state, { payload }: { payload: { messageId: number } }) {
      if (state.items[payload.messageId])
        state.items[payload.messageId].unread = false;
      saveState(state);
      updateBadge(selectUnreadCount()({ messages: state }));
    },
    markAllRead(state) {
      Object.values(state.items).forEach((m) => (m.unread = false));
      saveState(state);
      updateBadge(0);
    },
  },
  extraReducers: (builder) => {
    builder.addCase('@@INIT', loadState);
  },
});

const { setStatus } = messagesSlice.actions;
export const { reset } = messagesSlice.actions;

export const update: () => AppThunkAction<Promise<void>> =
  () => async (dispatch, getState) => {
    const creds = selectCreds()(getState());
    if (!creds) {
      log(
        'warning',
        'messagesSlice.update was called without creds being set.'
      );
      return;
    }
    dispatch(setStatus('loading'));
    try {
      const response = await new session(creds).getMessages();
      dispatch(reset({ messages: response.messages }));
      dispatch(setStatus('loaded'));
    } catch (e) {
      log('error', 'messagesSlice.update raised an error.', e);
      dispatch(setStatus('error'));
    }
  };

export const selectSyncState =
  () =>
  ({ messages: { status } }: RootState) => ({
    isLoading: status === 'loading',
    isOffline: status === 'error',
  });

export const selectMessageById =
  (id: number) =>
  ({ messages }: RootState) =>
    messages.items[id];

export const selectAllMessages =
  () =>
  ({ messages }: RootState) =>
    Object.values(messages.items);

export const selectUnreadCount =
  () =>
  ({ messages }: RootState | Pick<RootState, 'messages'>) =>
    Object.values(messages.items).filter((m) => m.unread).length;

export const selectUnreadMessages =
  () =>
  ({ messages }: RootState) =>
    Object.values(messages.items).filter((m) => m.unread);

export const markRead: (messageId: number) => AppThunkAction<Promise<void>> =
  (messageId) => async (dispatch, getState) => {
    const creds = selectCreds()(getState());
    if (!creds) return;
    dispatch(messagesSlice.actions.markRead({ messageId }));
    await new session(creds).markMsgRead(messageId);
  };

export const markAllRead: () => AppThunkAction<Promise<void>> =
  () => async (dispatch, getState) => {
    const creds = selectCreds()(getState());
    if (!creds) return;
    dispatch(messagesSlice.actions.markAllRead());
    await new session(creds).markAllMsgsRead();
  };

export default messagesSlice.reducer;
