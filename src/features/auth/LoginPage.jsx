import React, { useState } from 'react';
import { Container, Row, Image, Form, FormGroup, Button, Alert, Spinner } from 'react-bootstrap';
import logo from '../../logo.svg';
import { connect } from 'react-redux';
import { login } from './state';

const LoginPage = ({ processing, error, login }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const onSubmit = (event) => {
    event.preventDefault();

    login(username, password);
  };

  return (
    <Container style={ { minHeight: "100vh", background: "#463A54" } }>
      <Row style={ { display: "block", textAlign: "center", padding: "80px 0 40px 0" } }>
        <Image src={logo} width="100px" />
      </Row>
      <p style={ { fontWeight: 'bold', color: "lightgray" }}>
        Campus, eine App für Studenten der TU Darmstadt.
      </p>
      <p style={ { color: "lightgray" }}>
        Hinweis: Die App befindet sich derzeit noch in einer frühen Entwicklungsphase.
        Um Fehlern schneller auf die Schliche zu kommen, werden umfangreiche Protokolle angelegt.
        Diese können auch personenbezogene Daten enthalten.
        Mit der Nutzung dieser App erklärst du dich damit einverstanden.
      </p>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Form.Control type='text' placeholder='TU-Id' disabled={processing} onChange={(event) => setUsername(event.target.value)} />
        </FormGroup>
        <FormGroup>
          <Form.Control type='password' placeholder='Passwort' disabled={processing} onChange={(event) => setPassword(event.target.value)} />
        </FormGroup>
        <Alert variant="warning" hidden={!error}>
          {error}
        </Alert>
        {
          processing ? (
            <div style={ { display: "block", textAlign: "center" } }>
              <Spinner animation="grow" variant="light" />
            </div>
          ) : (
            <Button type='submit' disabled={processing}>Anmelden</Button>
          )
        }
      </Form>
    </Container>
    );
};

export default connect(
  ({ auth }) => ({
    processing: auth.processing,
    error: auth.error
  }),
  { login }
)(LoginPage);
