import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { IonApp, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useEffect } from 'react';
import { useOnboardingElement } from '../features/onboarding/Onboarding';
import './App.css';
import Routes from './Routes';
import TabBar from './TabBar';

const App = () => {
  const onboardingElement = useOnboardingElement();

  const statusBarColor: Style =
    Capacitor.getPlatform() === 'ios'
      ? onboardingElement
        ? Style.Dark
        : Style.Light
      : Style.Dark;

  useEffect(() => {
    StatusBar.setStyle({ style: statusBarColor });
  }, [statusBarColor]);

  if (onboardingElement) return onboardingElement;
  return (
    <IonApp>
      <IonReactRouter>
        {onboardingElement || (
          <IonTabs>
            {Routes()}
            {TabBar()}
          </IonTabs>
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
