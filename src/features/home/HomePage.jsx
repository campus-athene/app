import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import CalendarWidget from '../calendar/CalendarWidget';
import CanteenWidget from '../canteen/CanteenWidget';
import EventWidget from '../events/EventWidget';
import MessagesWidget from '../messages/MessagesWidget';
import NewsWidget from '../news/NewsWidget';
import AppsWidget from './AppsWidget';

const HomePage = () => {
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Start</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Start</IonTitle>
          </IonToolbar>
        </IonHeader>
        <AppsWidget />
        <CalendarWidget />
        <MessagesWidget />
        <CanteenWidget />
        <EventWidget />
        <NewsWidget />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
