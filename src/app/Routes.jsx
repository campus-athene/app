import { Route, Switch as RoutesCollection } from 'react-router-dom';
import CalendarPage from '../features/calendar/CalendarPage';
import CanteenPage from '../features/canteen/CanteenPage';
import CourseRegPage from '../features/courses/CourseRegPage';
import CourseDetailsPage from '../features/courses/DetailsPage';
import CourseListPage from '../features/courses/ListPage';
import DocumentsPage from '../features/documents/DocumentsPage';
import HomePage from '../features/home/HomePage';
import MapListPage from '../features/maps/MapListPage';
import MapViewPage from '../features/maps/MapViewPage';
import MessagesPage from '../features/messages/MessagesPage';
import BrowseNewsPage from '../features/news/BrowseNewsPage';
import { useOnboardingElement } from '../features/onboarding/Onboarding';
import SettingsPage from '../features/settings/SettingsPage';
import OappPage from '../features/wiki/WikiPage';

const Routes = () => {
  const onboardingElement = useOnboardingElement();
  if (onboardingElement) return onboardingElement;

  return (
    // Usually just called <Routes> but the component we are exporting is also called Routes.
    <RoutesCollection>
      <Route exact path="/" component={HomePage} />
      <Route path="/calendar" component={CalendarPage} />
      <Route path="/canteen" component={CanteenPage} />
      <Route exact path="/coursereg" component={CourseRegPage} />
      <Route
        path="/coursereg/:major/:area/:rootList"
        component={CourseRegPage}
      />
      <Route exact path="/courses" component={CourseListPage} />
      <Route
        path="/courses/register/:major/:area/:list/:module"
        component={<CourseDetailsPage registration />}
      />
      <Route path="/courses/:semester/:number" component={CourseDetailsPage} />
      <Route exact path="/maps" component={MapListPage} />
      <Route path="/maps/:map" component={MapViewPage} />
      <Route path="/messages" component={MessagesPage} />
      <Route path="/news" component={BrowseNewsPage} />
      <Route path="/oapp" component={OappPage} />
      <Route path="/documents" component={DocumentsPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="*" component={NoMatch} />
    </RoutesCollection>
  );
};

const NoMatch = () => {
  throw new Error('The requested path could not be found.');
};

export default Routes;
