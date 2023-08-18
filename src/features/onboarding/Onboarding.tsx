import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectMoodleToken } from '../auth/authSlice';
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
  const [completedCNLogin, setCompletedCNLogin] = useState(false);

  const needsMoodleLogin = !useSelector(selectMoodleToken());
  const needsPrivacySetup = useSelector(selectNeedsPrivacySetup());
  const needsPushSetup = useSelector(selectNeedsNotificationSetup());
  const onboardingComplete = useSelector(selectOnboardingComplete());

  if (needsMoodleLogin) return <LoginPage />;
  if (needsPrivacySetup) return <PrivacyPage />;
  // Do not show CampusNet login if the user has already completed onboarding before
  if (!completedCNLogin && !onboardingComplete)
    return <CampusNetLoginPage onCompleted={() => setCompletedCNLogin(true)} />;
  if (needsPushSetup) return <NotificationsPage />;
  if (!onboardingComplete) return <WelcomePage />;

  return null;
};
