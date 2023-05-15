import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCampusNetCreds, selectMoodleToken } from '../auth/authSlice';
import {
  selectNeedsNotificationSetup,
  selectNeedsPrivacySetup,
  selectOnboardingComplete,
} from '../settings/settingsSlice';
import CampusNetLoginPage from './CampusNetLoginPage';
import LoginPage from './LoginPage';
import NotificationsPage from './NotificationsPage';
import PrivacyPage from './PrivacyPage';
import WelcomePage from './WelcomePage';

const Onboarding = () => {
  const [skipCampusNetLogin, setSkipCampusNetLogin] = useState(false);

  const needsMoodleLogin = !useSelector(selectMoodleToken());
  const needsPrivacySetup = useSelector(selectNeedsPrivacySetup());
  const needsCampusNetLogin =
    !useSelector(selectCampusNetCreds()) && !skipCampusNetLogin;
  const needsPushSetup = useSelector(selectNeedsNotificationSetup());
  const needsWelcome = !useSelector(selectOnboardingComplete());

  if (needsMoodleLogin) return <LoginPage />;
  if (needsPrivacySetup) return <PrivacyPage />;
  if (needsCampusNetLogin)
    return <CampusNetLoginPage onSkip={() => setSkipCampusNetLogin(true)} />;
  if (needsPushSetup) return <NotificationsPage />;
  if (needsWelcome) return <WelcomePage />;

  throw new Error('Onboarding was displayed even though finished.');
};

export default Onboarding;
