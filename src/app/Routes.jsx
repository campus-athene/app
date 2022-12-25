import { useSelector } from 'react-redux';
import { Route, Routes as RoutesCollection } from 'react-router-dom';
import CalendarPage from '../features/calendar/CalendarPage';
import CanteenPage from '../features/canteen/CanteenPage';
import CourseRegPage from '../features/courses/CourseRegPage';
import CourseDetailsPage from '../features/courses/DetailsPage';
import CourseListPage from '../features/courses/ListPage';
import HomePage from '../features/home/HomePage';
import MapListPage from '../features/maps/MapListPage';
import MapViewPage from '../features/maps/MapViewPage';
import MessagesPage from '../features/messages/MessagesPage';
import BrowseNewsPage from '../features/news/BrowseNewsPage';
import Onboarding from '../features/onboarding/Onboarding';
import SettingsPage from '../features/settings/SettingsPage';
import { selectOnboardingComplete } from '../features/settings/settingsSlice';
import OappPage from '../features/wiki/WikiPage';

const Routes = () => {
  const onboardingComplete = useSelector(selectOnboardingComplete());
  if (!onboardingComplete) return <Onboarding />;

  return (
    // Usually just called <Routes> but the component we are exporting is also called Routes.
    <RoutesCollection>
      <Route path="/" element={<HomePage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/canteen" element={<CanteenPage />} />
      <Route path="/coursereg" element={<CourseRegPage />} />
      <Route
        path="/coursereg/:major/:area/:rootList"
        element={<CourseRegPage />}
      />
      <Route path="/courses" element={<CourseListPage />} />
      <Route
        path="/courses/:semester/:number"
        element={<CourseDetailsPage />}
      />
      <Route
        path="/courses/register/:major/:area/:list/:module"
        element={<CourseDetailsPage registration />}
      />
      <Route path="/maps" element={<MapListPage />} />
      <Route path="/maps/:map" element={<MapViewPage />} />
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/news" element={<BrowseNewsPage />} />
      <Route path="/oapp" element={<OappPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<NoMatch />} />
    </RoutesCollection>
  );
};

const NoMatch = () => {
  throw new Error('The requested path could not be found.');
};

export default Routes;
