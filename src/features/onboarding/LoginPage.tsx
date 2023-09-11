import { App } from '@capacitor/app';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { log } from '../../app/errorReporting';
import Logo from '../../components/Logo';
import { updateMoodleToken } from '../auth/authSlice';
import { Frame } from './Controls';

const svcWindow = window as Window & {
  SafariViewController?: {
    show: (options: { toolbarColor: string; url: string }) => void;
    hide: () => void;
    isAvailable: (cb: (isAvailable: boolean) => void) => void;
  };
};

const LoginPage = () => {
  const dispatch = useDispatch();

  const login = () => {
    const url = `https://moodle.tu-darmstadt.de/admin/tool/mobile/launch.php?service=moodle_mobile_app&passport=${
      Math.random() * 1000
    }&urlscheme=com.oliverrm.campus.moodlelogin`;

    const onAvailable = (isAvailable: boolean) => {
      if (svcWindow.SafariViewController && isAvailable)
        svcWindow.SafariViewController.show({
          toolbarColor: '#372649',
          url,
        });
      else if (process.env.NODE_ENV === 'development') {
        window.open(url, '_blank');
        // For debugging purposes only.
        (window as any).setMoodleToken = (token: string) =>
          dispatch(updateMoodleToken(token));
        console.log(
          `Open ${url} in the browser and run window.setMoodleToken("...") in the console to log in.`,
        );
      } else {
        log('error', 'User cannot log in as there is no SafariViewController.');
        alert('Anmeldung wird auf diesem Gerät nicht unterstützt.');
      }
    };

    svcWindow.SafariViewController
      ? (window as any).SafariViewController.isAvailable(onAvailable)
      : onAvailable(false);
  };

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

  const [logoClickCount, setLogoClickCount] = useState(0);
  // On tenth click, set moodle token to "Ljo6Oi46Ojou" (base64 encoded ".:::.:::.").
  const onLogoClick = () =>
    logoClickCount < 9
      ? setLogoClickCount((c) => c + 1)
      : dispatch(updateMoodleToken('Ljo6Oi46Ojou'));

  return (
    <Frame noBack priAction="Anmelden" onPriAction={login}>
      {/* Empty <div /> are for spacing. */}
      <Logo onClick={onLogoClick} className="h-32" />
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
