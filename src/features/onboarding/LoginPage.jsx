import { useState } from 'react';
import { Alert, Form, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { login } from '../auth/authSlice';
import Logo from '../common/Logo';
import { Button } from './Controls';

const LoginPage = () => {
  const dispatch = useDispatch();

  const [processing, setProcessing] = useState();
  const [error, setError] = useState();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const onSubmit = async (event) => {
    event.preventDefault();

    setProcessing(true);
    setError(null);

    const error = await dispatch(login(username, password));

    if (!error)
      // No need to do anything here as successful login will move the onboarding process to the next page.
      // Updating state now would mean updating state of an unmounted component which is not allowed.
      return;

    setProcessing(false);
    setError(error);
  };

  return (
    <div
      style={{
        height: '100vh',
        background: '#372649',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        paddingTop: 'env(safe-area-inset-bottom))',
        paddingBottom: 'env(safe-area-inset-bottom))',
      }}
    >
      <Logo style={{ height: '40vw' }} />
      <div
        style={{ fontWeight: 'bold', color: 'lightgray', textAlign: 'center' }}
      >
        <p>Campus</p>
        <p>
          Die App für Studierende
          <br />
          der TU Darmstadt.
        </p>
      </div>
      <div></div>
      <form
        onSubmit={onSubmit}
        style={{
          display: 'grid',
          gridAutoRows: '2.5em',
          rowGap: '1em',
          marginRight: 'calc(1rem + env(safe-area-inset-right))',
          marginLeft: 'calc(1rem + env(safe-area-inset-left))',
        }}
      >
        <Alert
          variant="warning"
          style={{
            visibility: error ? null : 'hidden',
            marginBottom: '0',
            padding: '0.375rem 0.75rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {error}
        </Alert>
        <Form.Control
          type="text"
          placeholder="TU-Id"
          autoCapitalize="off"
          autoComplete="username"
          disabled={processing}
          onChange={(event) => setUsername(event.target.value)}
          style={{ height: 'auto' }}
        />
        <Form.Control
          type="password"
          placeholder="Passwort"
          autoComplete="current-password"
          disabled={processing}
          onChange={(event) => setPassword(event.target.value)}
          style={{ height: 'auto' }}
        />
        {processing ? (
          <Spinner
            animation="grow"
            variant="light"
            style={{ margin: 'auto' }}
          />
        ) : (
          <Button type="submit" disabled={processing}>
            Anmelden
          </Button>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
