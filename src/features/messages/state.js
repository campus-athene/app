export const update = (messages) => ({
  type: 'MESSAGES_UPDATE',
  messages
});

const load = () => {
  const msgs = {};
  (JSON.parse(localStorage.getItem('messages')) || [])
    .forEach(m => msgs[m.id] = m);
  return msgs;
}

export default (state = load(), action) => {
  switch (action.type) {
    case 'MESSAGES_UPDATE':
      const msgs = Object.assign({}, state);
      action.messages
        .forEach(m => msgs[m.id] = m);
      localStorage.setItem('messages', JSON.stringify(Object.values(msgs)));
      return msgs;
    default:
      return state;
  }
}
