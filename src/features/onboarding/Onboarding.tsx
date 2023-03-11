import { useSelector } from 'react-redux';
import { selectCreds } from '../auth/authSlice';
import {
  selectNeedsNotificationSetup,
  selectNeedsPrivacySetup,
  selectOnboardingComplete,
} from '../settings/settingsSlice';
import LoginPage from './LoginPage';
import NotificationsPage from './NotificationsPage';
import PrivacyPage from './PrivacyPage';
import WelcomePage from './WelcomePage';

const Onboarding = (): JSX.Element => {
  const needsLogin = !useSelector(selectCreds());
  const needsSetup = useSelector(selectNeedsNotificationSetup());
  const needsPrivacySetup = useSelector(selectNeedsPrivacySetup());
  const needsWelcome = !useSelector(selectOnboardingComplete());

  if (needsLogin) return <LoginPage />;
  if (needsSetup) return <NotificationsPage />;
  if (needsPrivacySetup) return <PrivacyPage />;
  if (needsWelcome) return <WelcomePage />;

  throw new Error('Onboarding was displayed even though finished.');
};

export default Onboarding;
