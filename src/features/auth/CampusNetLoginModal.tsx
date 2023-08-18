import { useState } from 'react';
import Button from '../../components/Button';
import CardModal, { CardModalProps } from '../../components/CardModal';
import { TucanLogo } from '../../components/Logo';
import { useLogin } from '../../provider/camusnet';

const CampusNetLoginModal = (
  props: Partial<
    Pick<CardModalProps, 'open' | 'onOpen' | 'onClose'> & {
      onCompleted: () => void;
    }
  >
) => {
  const login = useLogin();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError('Bitte verfollständige Deine Eingaben.');
      return;
    }
    setProcessing(true);
    setError(await login(username, password));
    setProcessing(false);
    props.onCompleted && props.onCompleted();
  };

  return (
    <CardModal open={props.open} onOpen={props.onOpen} onClose={props.onClose}>
      <TucanLogo className="mx-auto mb-4 mt-4 block h-12" />
      <p className="mx-4 mb-4 text-center">
        {/* Die Anmeldung mit TUCaN erfolgt getrennt vom SSO. Die Zugangsdaten
        werden verschlüsselt lokal auf Deinem Gerät gespeichert. */}
        Deine Anmeldedaten werden verschlüsselt an die TUCaN-Server übertragen
        und nicht an Dritte weitergegeben.
      </p>
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
        {error && (
          <div className="rounded-3xl border border-solid border-amber-400 bg-amber-100 px-4 py-1.5">
            {error}
          </div>
        )}
        <input
          className="rounded-full border-none bg-slate-200 px-4 py-1.5"
          type="text"
          placeholder="TU-Id"
          autoCapitalize="off"
          autoComplete="username"
          disabled={processing}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          className="rounded-full border-none bg-slate-200 px-4 py-1.5"
          type="password"
          placeholder="Passwort"
          autoComplete="current-password"
          disabled={processing}
          onChange={(event) => setPassword(event.target.value)}
        />
        {processing ? (
          <div className="mx-auto my-2.5 h-5 w-5 animate-ping rounded-full bg-slate-600" />
        ) : (
          <Button
            className="justify-self-center rounded-full"
            type="submit"
            disabled={processing}
          >
            Anmelden
          </Button>
        )}
      </form>
    </CardModal>
  );
};

export default CampusNetLoginModal;
