import { IonApp, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useOnboardingElement } from '../features/onboarding/Onboarding';
import './App.css';
import Routes from './Routes';
import TabBar from './TabBar';

const App = () => {
  const onboardingElement = useOnboardingElement();
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
