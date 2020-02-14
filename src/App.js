import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ExamListPage from './pages/ExamListPage';
import ExamDetailsPage from './pages/ExamDetailsPage';
import { Container, Alert, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

const App = ({ loggedIn }) => {
  return (
    <Router>
      { loggedIn ? (
        <Switch>
          <Route path="/exams/:id">
            <ExamDetailsPage />
          </Route>
          <Route path="/exams">
            <ExamListPage />
          </Route>
          <Route path="/" exact>
            <ExamListPage />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
        ) : (
        <LoginPage />
        )
      }
    </Router>
  );
}

function NoMatch() {
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
  state => ({ loggedIn: state.auth.loggedIn })
)(App);
