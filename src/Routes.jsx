import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { selectOnboardingComplete } from './features/settings/settingsSlice';
import Onboarding from './features/onboarding/Onboarding';
import HomePage from './features/home/HomePage';
import MessagesPage from './features/messages/MessagesPage';
import CourseDetailsPage from './features/courses/DetailsPage';
import CoursListPage from './features/courses/ListPage';
import CourseRegPage from './features/courses/CourseRegPage';
import OappPage from './features/wiki/WikiPage';
import MapViewPage from './features/maps/MapViewPage';
import MapListPage from './features/maps/MapListPage';
import BrowseNewsPage from './features/news/BrowseNewsPage';

export const historyRef = { history: null };

const Routes = () => {
  historyRef.history = useHistory();

  const onboardingComplete = useSelector(selectOnboardingComplete());
  if (!onboardingComplete) return <Onboarding />;

  return (
    <Switch>
      <Route path="/news">
        <BrowseNewsPage />
      </Route>
      <Route path="/messages/:id">
        <MessagesPage />
      </Route>
      <Route path="/messages">
        <MessagesPage />
      </Route>
      <Route path="/courses/register/:major/:area/:list/:module">
        <CourseDetailsPage registration />
      </Route>
      <Route path="/courses/:semester/:number">
        <CourseDetailsPage />
      </Route>
      <Route path="/courses">
        <CoursListPage />
      </Route>
      <Route path="/coursereg/:major/:area/:rootList">
        <CourseRegPage />
      </Route>
      <Route path="/coursereg">
        <CourseRegPage />
      </Route>
      <Route path="/oapp">
        <OappPage />
      </Route>
      <Route path="/maps/:map">
        <MapViewPage />
      </Route>
      <Route path="/maps">
        <MapListPage />
      </Route>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
};

const NoMatch = () => {
  throw new Error('The requested path could not be found.');
};

export default Routes;
