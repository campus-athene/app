import { Badge } from '@capawesome/capacitor-badge';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { log } from '../app/errorReporting';
import canteenData from '../features/canteen/canteenData';
import { selectCanteen } from '../features/canteen/canteenSettings';
import { useSyncSettings } from '../features/settings/settingsSlice';
import { useUnreadMessagesCount } from '../provider/camusnet/messages';

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

  const canteenId = useSelector(selectCanteen());
  canteenData.useMenuItemsQuery({ canteenId, days: 1 });

  return null;
};
