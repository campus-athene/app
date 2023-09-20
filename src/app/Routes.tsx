import { IonRouterOutlet } from '@ionic/react';
import { Redirect, Route, useLocation } from 'react-router-dom';
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
import SettingsPage from '../features/settings/SettingsPage';
import WikiPage from '../features/wiki/WikiPage';

const Routes = () => {
  return (
    <IonRouterOutlet>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route exact path="/home" component={HomePage} />
      <Route path="/home/messages" component={MessagesPage} />
      <Route path="/home/canteen" component={CanteenPage} />
      <Route path="/home/news" component={BrowseNewsPage} />
      <Route path="/home/wiki" component={WikiPage} />
      <Route path="/calendar" component={CalendarPage} />
      <Route exact path="/study" component={CourseListPage} />
      <Route
        path="/study/course/detail/semester/:semester/:number"
        component={CourseDetailsPage}
      />
      <Route
        path="/study/course/detail/list/:major/:area/:list/:module"
        component={CourseDetailsPage}
      />
      <Route exact path="/study/courseReg/root" component={CourseRegPage} />
      <Route
        path="/study/courseReg/list/:major/:area/:rootList"
        component={CourseRegPage}
      />
      <Route exact path="/map" component={MapListPage} />
      <Route path="/map/:map" component={MapViewPage} />
      <Route exact path="/profile" component={SettingsPage} />
      <Route path="/profile/documents" component={DocumentsPage} />
      <Route component={NoMatch} />
    </IonRouterOutlet>
  );
};

const NoMatch = () => {
  const location = useLocation();
  throw new Error(
    `The requested path could not be found: ${location.pathname}`,
  );
};

export default Routes;
