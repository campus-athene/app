import { createSlice } from '@reduxjs/toolkit';
import { Badge } from '@robingenz/capacitor-badge';
import { session } from '../../api';
import { log } from '../../errorReporting';

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

const updateBadge = async (count) => {
  try {
    await Badge.set({ count });
  } catch (error) {
    log('warning', 'Error updating badge.', error);
  }
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { items: {} },
  reducers: {
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

export const { reset } = messagesSlice.actions;

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
