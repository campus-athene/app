const storageKey = 'sessionId';

export const getSessionId = () => {
  let sessionId = localStorage.getItem(storageKey);
  if (!sessionId) {
    sessionId = Array.from(crypto.getRandomValues(new Uint8Array(8)))
      .map((n) => n.toString(16).padStart(2, 'X'))
      .join('');
    localStorage.setItem(storageKey, sessionId);
  }
  return sessionId;
};
