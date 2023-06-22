import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppThunkAction } from '.';
import { log } from '../app/errorReporting';
import canteenData from '../features/canteen/canteenData';
import { selectCanteen } from '../features/canteen/canteenSettings';
import { update as updateNews } from '../features/news/newsSlice';
import { useSyncSettings } from '../features/settings/settingsSlice';
import { useAppDispatch } from './hooks';
import { useUnreadMessagesCount } from '../provider/camusnet/messages';
import { Badge } from '@capawesome/capacitor-badge';

export const update: () => AppThunkAction<void> =
  () => (dispatch, getState) => {
    const tasks: (() => AppThunkAction<Promise<unknown> | unknown>)[] = [
      updateNews,
    ];

    Promise.allSettled(
      tasks.map(async (t) => {
        try {
          return await dispatch(t());
        } catch (e) {
          log('warning', 'A task in updateAsync was rejected.', e);
        }
      })
    );
  };

export const UpdateEffect = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(update());
  }, [dispatch]);

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
