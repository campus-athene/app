import React from 'react';
import logo from './logo.svg';
import Container from 'react-bootstrap/Container'
import { Image, Alert, Button } from 'react-bootstrap';

function App() {
  return (
    <Container>
      <Image src={logo} alt="logo" />
      <Alert variant="primary">
        Edit <code>src/App.js</code> and save to reload.
      </Alert>
      <Button
        variant="primary"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </Button>
    </Container>
  );
}

export default App;
