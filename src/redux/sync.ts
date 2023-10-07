import { Badge } from '@capawesome/capacitor-badge';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { log } from '../app/errorReporting';
import { useUnreadMessagesCount } from '../features/messages/messageModel';
import {
  selectPushEnabled,
  useSyncSettings,
} from '../features/settings/settingsSlice';

export const UpdateEffect = () => {
  useSyncSettings();

  // Keep unread messages badge up to date
  const pushEnabled = useSelector(selectPushEnabled('messages'));
  const unreadMessages = useUnreadMessagesCount().data;
  useEffect(() => {
    if (pushEnabled && unreadMessages !== undefined)
      try {
        Badge.set({ count: unreadMessages });
      } catch (e) {
        log('warning', 'Failed to set badge count', e);
      }
  }, [pushEnabled, unreadMessages]);

  return null;
};
