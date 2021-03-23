import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { selectCreds } from './features/auth/authSlice';
import LoginPage from './features/auth/LoginPage';
import HomePage from './features/home/HomePage';
import MessagesPage from './features/messages/MessagesPage';
import CoursListPage from './features/courses/CoursListPage';
import CourseRegPage from './features/courses/CourseRegPage';
import ExamListPage from './features/exams/ExamListPage';
import ExamDetailsPage from './features/exams/ExamDetailsPage';
import OappPage from './features/oapp/OappPage';
import OappArticlePage from './features/oapp/OappArticlePage';
import MapsPage from './features/maps/MapsPage';

const Routes = () =>
  useSelector(selectCreds()) ? (
    <Switch>
      <Route path="/messages/:id">
        <MessagesPage />
      </Route>
      <Route path="/messages">
        <MessagesPage />
      </Route>
      <Route path="/courses">
        <CoursListPage />
      </Route>
      <Route path="/coursereg">
        <CourseRegPage />
      </Route>
      <Route path="/exams/:id">
        <ExamDetailsPage />
      </Route>
      <Route path="/exams">
        <ExamListPage />
      </Route>
      <Route path="/oapp/:l1/:l2/:l3">
        <OappArticlePage />
      </Route>
      <Route path="/oapp">
        <OappPage />
      </Route>
      <Route path="/maps">
        <MapsPage />
      </Route>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  ) : (
    <LoginPage />
  );

const NoMatch = () => {
  throw new Error('The requested path could not be found.');
};

export default Routes;
