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

export const useOnboardingElement = () => {
  const [skipCampusNetLogin, setSkipCampusNetLogin] = useState(false);

  const needsMoodleLogin = !useSelector(selectMoodleToken());
  const needsPrivacySetup = useSelector(selectNeedsPrivacySetup());
  const needsCampusNetLogin =
    !useSelector(selectCampusNetCreds()) && !skipCampusNetLogin;
  const needsPushSetup = useSelector(selectNeedsNotificationSetup());
  const onboardingComplete = useSelector(selectOnboardingComplete());

  if (needsMoodleLogin) return <LoginPage />;
  if (needsPrivacySetup) return <PrivacyPage />;
  // Do not show CampusNet login if the user has already completed onboarding before
  if (needsCampusNetLogin && !onboardingComplete)
    return <CampusNetLoginPage onSkip={() => setSkipCampusNetLogin(true)} />;
  if (needsPushSetup) return <NotificationsPage />;
  if (!onboardingComplete) return <WelcomePage />;

  return null;
};
