import React from 'react';
import { Container, ButtonGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginPage = () => (
  <Container>
    <h1>ExamListPage</h1>
    <p>This is only a placeholder.</p>
    <ButtonGroup>
      <Button to="/" as={Link}>Home</Button>
      <Button to="/exams" as={Link}>Exams</Button>
      <Button to="/exams/2" as={Link}>Exam 2</Button>
      <Button to="/404" as={Link}>404</Button>
    </ButtonGroup>
  </Container>
);

export default LoginPage;
