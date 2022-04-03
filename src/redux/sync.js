import { log } from '../errorReporting';
import { selectCreds } from '../features/auth/authSlice';
import { update as updateCourses } from '../features/courses/coursesSlice';
import { loadArea } from '../features/courses/offersSlice';
import { update as updateMessages } from '../features/messages/messagesSlice';
import { update as updateNews } from '../features/news/newsSlice';
import { syncSettings } from '../features/settings/settingsSlice';

export const update = () => (dispatch, getState) => {
  const creds = selectCreds()(getState(), dispatch);

  if (!creds) return;

  const tasks = [
    updateNews,
    syncSettings,
    updateMessages,
    updateCourses,
    loadArea, // Request course offers from server. They are not included in loadData.
  ];

  Promise.allSettled(
    tasks.map(async (t) => {
      try {
        return await dispatch(t());
      } catch (e) {
        log('warn', 'A task in updateAsync was rejected.', e);
      }
    })
  );
};
