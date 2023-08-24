import { Badge } from '@capawesome/capacitor-badge';
import { useEffect } from 'react';
import { log } from '../app/errorReporting';
import { useUnreadMessagesCount } from '../features/messages/messageModel';
import { useSyncSettings } from '../features/settings/settingsSlice';

export const UpdateEffect = () => {
  useSyncSettings();

  // Keep unread messages badge up to date
  const unreadMessages = useUnreadMessagesCount().data;
  useEffect(() => {
    if (unreadMessages !== undefined)
      try {
        Badge.set({ count: unreadMessages });
      } catch (e) {
        log('warning', 'Failed to set badge count', e);
      }
  }, [unreadMessages]);

  return null;
};
