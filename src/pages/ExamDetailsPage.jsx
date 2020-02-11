import React from 'react';
import { Container, ButtonGroup, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

const LoginPage = () => {
  const { id } = useParams();
  
  return (
    <Container>
      <h1>ExamDetailsPage</h1>
      <p>Exam number <code>{id}</code> will be shown.</p>
      <ButtonGroup>
      <Button to="/" as={Link}>Home</Button>
        <Button to="/exams" as={Link}>Exams</Button>
        <Button to="/exams/2" as={Link}>Exam 2</Button>
        <Button to="/404" as={Link}>404</Button>
      </ButtonGroup>
    </Container>
    );
};

export default LoginPage;
