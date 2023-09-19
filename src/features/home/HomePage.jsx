import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useSelector } from 'react-redux';
import { selectStatusBarHeightCss } from '../../redux/globalSlice';
import CalendarWidget from '../calendar/CalendarWidget';
import CanteenWidget from '../canteen/CanteenWidget';
import EventWidget from '../events/EventWidget';
import MessagesWidget from '../messages/MessagesWidget';
import NewsWidget from '../news/NewsWidget';
import groupYoungPeoplePosingPhoto from './group-young-people-posing-photo.svg';
import Widget from './Widget';

const HomePage = () => {
  const statusBarHeightCss = useSelector(selectStatusBarHeightCss());

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
        <CalendarWidget />
        <MessagesWidget />
        <CanteenWidget />
        <NewsWidget />
        <EventWidget />
        <Widget
          style={{
            textAlign: 'center',
            paddingBottom: '1.5rem',
            paddingTop: '2rem',
          }}
        >
          <div style={{ fontSize: '1.4em' }}>
            Zusammen macht’s
            <br />
            am meisten Spaß
          </div>
          <img
            src={groupYoungPeoplePosingPhoto}
            style={{ height: '12em', margin: '-1em auto' }}
            alt="focused people studying"
          />
          <div>
            Empfehle Campus Deinen Freunden und
            <br />
            meistert das Studium gemeinsam.
          </div>
        </Widget>
        <Widget
          onClick={() => (window.location.href = 'mailto:campus@oliverrm.de')}
          style={{ padding: '0.5rem' }}
        >
          Gefällt Dir Campus? Hast Du Vorschläge für Verbesserungen? Wir freuen
          uns über Dein Feedback.
        </Widget>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
