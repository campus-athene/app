import { App } from '@capacitor/app';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { log } from '../../app/errorReporting';
import Logo from '../../components/Logo';
import { updateMoodleToken } from '../auth/authSlice';
import { Frame } from './Controls';

const LoginPage = () => {
  const dispatch = useDispatch();

  const login = () => {
    const url = `https://moodle.tu-darmstadt.de/admin/tool/mobile/launch.php?service=moodle_mobile_app&passport=${
      Math.random() * 1000
    }&urlscheme=com.oliverrm.campus.moodlelogin`;

    (window as any).SafariViewController?.isAvailable(
      (isAvailable: boolean) => {
        if (isAvailable)
          (window as any).SafariViewController.show({
            toolbarColor: '#372649',
            url,
          });
        else if (process.env.NODE_ENV === 'development') {
          window.open(url, '_blank');
        } else {
          log(
            'error',
            'User cannot log in as there is no SafariViewController.'
          );
          alert('Anmeldung wird auf diesem Gerät nicht unterstützt.');
        }
      }
    );
  };

  // For debugging purposes only.
  (window as any).setMoodleToken = (token: string) =>
    dispatch(updateMoodleToken(token));

  useEffect(() => {
    const hd = App.addListener('appUrlOpen', (e) => {
      const prefix = 'com.oliverrm.campus.moodlelogin://token=';
      if (!e.url.startsWith(prefix)) return;
      (window as any).SafariViewController.hide();
      dispatch(updateMoodleToken(e.url.substring(prefix.length)));
    });
    return () => {
      hd.then((h) => h.remove());
    };
  }, [dispatch]);

  return (
    <Frame noBack priAction="Anmelden" onPriAction={login}>
      {/* Empty <div /> are for spacing. */}
      <Logo className="h-32" />
      <div />
      <div />
      <p>Campus</p>
      <p>
        Die App gemacht von Studis
        <br />
        für Studis der TU Darmstadt.
      </p>
      <div />
      <div />
      <div />
      <div />
    </Frame>
  );
};

export default LoginPage;
