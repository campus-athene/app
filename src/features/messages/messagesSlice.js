import { createSlice } from '@reduxjs/toolkit';
import { session } from '../../api';
import { log } from '../../errorReporting';
import { selectCreds } from '../auth/authSlice';

const loadState = () => {
  const items = {};
  try {
    const stored = localStorage.getItem('messages');
    if (stored) JSON.parse(stored).forEach((m) => (items[m.id] = m));
  } catch (e) {
    log('error', 'messagesSlice.loadState threw an error.', e);
  }
  return { items };
};

const saveState = (state) =>
  localStorage.setItem('messages', JSON.stringify(Object.values(state.items)));

const updateBadge = (count) =>
  window.push &&
  window.push.setApplicationIconBadgeNumber(
    () => {},
    (error) => log('warning', 'Error updating badge.', error),
    count
  );

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { items: {}, status: 'initial' },
  reducers: {
    setStatus(state, { payload }) {
      state.status = payload;
    },
    reset(state, { payload }) {
      state.items = {};
      payload.messages.forEach((m) => (state.items[m.id] = m));
      saveState(state);
      updateBadge(selectUnreadCount()({ messages: state }));
    },
    markRead(state, { payload }) {
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

export const update = () => async (dispatch, getState) => {
  const creds = selectCreds()(getState(), dispatch);
  if (!creds) {
    log('warn', 'messagesSlice.update was called without creds being set.');
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
  ({ messages: { status } }) => ({
    isLoading: status === 'loading',
    isOffline: status === 'error',
  });

export const selectMessageById =
  (id) =>
  ({ messages }) =>
    messages.items[id];

export const selectAllMessages =
  () =>
  ({ messages }) =>
    Object.values(messages.items);

export const selectUnreadCount =
  () =>
  ({ messages }) =>
    Object.values(messages.items).filter((m) => m.unread).length;

export const markRead = (messageId) => async (dispatch, getState) => {
  dispatch(messagesSlice.actions.markRead({ messageId }));
  await new session(getState().auth.creds).markMsgRead(messageId);
};

export const markAllRead = () => async (dispatch, getState) => {
  dispatch(messagesSlice.actions.markAllRead());
  await new session(getState().auth.creds).markAllMsgsRead();
};

export default messagesSlice.reducer;
