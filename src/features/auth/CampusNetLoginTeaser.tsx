import { DetailedHTMLProps, SVGAttributes, useEffect, useState } from 'react';
import Button from '../../components/Button';
import CardModal from '../../components/CardModal';
import PageFrame from '../../components/PageFrame';
import { useLogin } from '../../provider/camusnet';

const TucanLogo = (
  props: DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>
) => (
  <svg viewBox="0 0 172.61 106.36" {...props}>
    <path
      fill="#99A604"
      d="M27.43,106.36c-9.93-44.13,6.99-49.3,50.67-49.3c55.24,0,93.32,18.53,93.32,18.53
	C183.05,32.4,106.91,0,54.68,0C-10.13,0-14.84,43.32,27.43,106.36z"
    />
    <circle fill="#FFFFFF" cx="30.22" cy="29.67" r="20.2" />
    <circle fill="#93999E" cx="30.22" cy="29.67" r="6.78" />
  </svg>
);

const CampusNetLoginTeaser = (props: { title: string }) => {
  const login = useLogin();

  const [dialogOpen, setDialogOpen] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => setDialogOpen(true), 400);
  }, [setDialogOpen]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError('Bitte verfollständige Deine Eingaben.');
      return;
    }
    setProcessing(true);
    setError(await login(username, password));
    setProcessing(false);
  };

  return (
    <PageFrame
      title={props.title}
      className="grid items-center justify-items-center"
    >
      <div className="w-[70%] text-center">
        <p className="mb-4">
          Verbinde Campus mit TUCaN um diesen Inhalt anzeigen zu können.
        </p>
        <Button onClick={() => setDialogOpen(true)}>Verbinden</Button>
      </div>
      <CardModal
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onOpen={() => setDialogOpen(true)}
      >
        <TucanLogo className="mx-auto mb-4 mt-4 block h-12" />
        <p className="mb-4 text-center">
          Die Anmeldung mit TUCaN erfolgt getrennt vom SSO. Die Zugangsdaten
          werden lokal auf Deinem Gerät gespeichert.
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
            <Button type="submit" disabled={processing}>
              Anmelden
            </Button>
          )}
        </form>
      </CardModal>
    </PageFrame>
  );
};

export default CampusNetLoginTeaser;
