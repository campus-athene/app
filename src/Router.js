import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as ReactRouter, Route, Switch, Link, useLocation } from "react-router-dom";
import { Container, Alert, Button } from 'react-bootstrap';
import LoginPage from './features/auth/LoginPage';
import HomePage from './pages/HomePage';
import MessagesPage from './features/messages/MessagesPage';
import CourseRegPage from './features/courses/CourseRegPage';
import ExamListPage from './features/exams/ExamListPage';
import ExamDetailsPage from './features/exams/ExamDetailsPage';
import MapsPage from './features/maps/MapsPage';

const Router = ({ loggedIn, update }) => (
  <ReactRouter>
    { loggedIn ? (
      <Switch>
        <Route path="/messages/:id">
          <MessagesPage />
        </Route>
        <Route path="/messages">
          <MessagesPage />
        </Route>
        <Route path="/classreg">
          <CourseRegPage />
        </Route>
        <Route path="/exams/:id">
          <ExamDetailsPage />
        </Route>
        <Route path="/exams">
          <ExamListPage />
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
      )
    }
  </ReactRouter>
);

const NoMatch = () => {
  let location = useLocation();

  return (
    <Container>
      <h2>404</h2>
      <Alert variant="danger">
        No match for <code>{location.pathname}</code>.
      </Alert>
      <Button
        variant="primary"
        to="/"
        as={Link}
      >
        Go Home
      </Button>
    </Container>
  );
}

export default connect(
  state => ({ loggedIn: state.auth.creds })
)(Router);
