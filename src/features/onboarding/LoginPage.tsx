import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import Logo from '../../components/Logo';
import { useAppDispatch } from '../../redux/hooks';
import { login } from '../auth/authSlice';
import { Button, Frame, Input, Subheading } from './Controls';

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
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
    <Frame>
      <Logo className="h-36" />
      <Subheading>
        <p className="mb-2">Campus</p>
        <p>
          Die App für Studierende
          <br />
          der TU Darmstadt
        </p>
      </Subheading>
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
        <div
          className="rounded-2xl border border-yellow-800 bg-yellow-100 text-yellow-800"
          style={{
            visibility: error ? undefined : 'hidden',
            marginBottom: '0',
            padding: '0.375rem 0.75rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {error}
        </div>
        <Input
          type="text"
          placeholder="TU-Id"
          autoCapitalize="off"
          autoComplete="username"
          disabled={processing}
          onChange={(event) => setUsername(event.target.value)}
          style={{ height: 'auto' }}
        />
        <Input
          type="password"
          placeholder="Passwort"
          autoComplete="current-password"
          disabled={processing}
          onChange={(event) => setPassword(event.target.value)}
          style={{ height: 'auto' }}
        />
        {processing ? (
          <CircularProgress style={{ margin: 'auto' }} color="secondary" />
        ) : (
          <Button className="mx-auto" type="submit" disabled={processing}>
            Anmelden
          </Button>
        )}
      </form>
    </Frame>
  );
};

export default LoginPage;
