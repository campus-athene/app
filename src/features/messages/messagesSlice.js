import { createSlice } from '@reduxjs/toolkit';
import { session } from '../../api';
import { dispatchInstructions } from '../../redux/instructions';

const loadState = () => {
  const items = {};
  try {
    const stored = localStorage.getItem('messages');
    if (stored) JSON.parse(stored).forEach((m) => (items[m.id] = m));
    markOldMsgsRead(items);
  } catch (e) {
    console.error(e);
  }
  return { items };
};

const markOldMsgsRead = (msgs) => {
  Object.values(msgs)
    .reverse()
    .forEach((m, i) => (m.unread = m.unread && i < 25));
  return msgs;
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { items: {} },
  reducers: {
    reset(state, { payload }) {
      state.items = {};
      payload.messages.forEach((m) => (state.items[m.id] = m));
      localStorage.setItem(
        'messages',
        JSON.stringify(Object.values(payload.messages))
      );
      markOldMsgsRead(state.items);
    },
    markRead(state, { payload }) {
      if (state.items[payload.messageId])
        state.items[payload.messageId].unread = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase('@@INIT', loadState);
  },
});

export const { reset } = messagesSlice.actions;

export const selectMessageById = (id) => ({ messages }) => messages.items[id];

export const selectAllMessages = () => ({ messages }) =>
  Object.values(messages.items);

export const selectUnreadCount = () => ({ messages }) =>
  Object.values(messages.items).filter((m) => m.unread).length;

export const markRead = (messageId) => async (dispatch, getState) => {
  dispatch(messagesSlice.actions.markRead({ messageId }));
  const response = await new session(getState().auth.creds).markMsgRead(
    messageId
  );
  dispatchInstructions(dispatch, response.instructions);
  return response.success
    ? null
    : response.message || 'Ein unbekannter Fehler ist aufgetreten.';
};

export default messagesSlice.reducer;
