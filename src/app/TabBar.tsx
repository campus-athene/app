import { IonIcon, IonLabel, IonTabBar, IonTabButton } from '@ionic/react';
import pageRoutes from './pageRoutes';
import './TabBar.css';
import iconBook from './tabIcons/book.svg';
import iconBookFilled from './tabIcons/bookFilled.svg';
import iconCalendar from './tabIcons/calendar.svg';
import iconCalendarFilled from './tabIcons/calendarFilled.svg';
import iconHome from './tabIcons/home.svg';
import iconHomeFilled from './tabIcons/homeFilled.svg';
import iconMap from './tabIcons/map.svg';
import iconMapFilled from './tabIcons/mapFilled.svg';
import iconSettings from './tabIcons/settings.svg';
import iconSettingsFilled from './tabIcons/settingsFilled.svg';

const TabBar = () => {
  return (
    <IonTabBar translucent slot="bottom">
      <IonTabButton tab="home" href={pageRoutes.home()}>
        <IonIcon className="selected-state p-1" icon={iconHomeFilled} />
        <IonIcon className="unselected-state p-1" icon={iconHome} />
        <IonLabel>Start</IonLabel>
      </IonTabButton>
      <IonTabButton tab="calendar" href={pageRoutes.calendar()}>
        <IonIcon className="selected-state p-1" icon={iconCalendarFilled} />
        <IonIcon className="unselected-state p-1" icon={iconCalendar} />
        <IonLabel>Kalender</IonLabel>
      </IonTabButton>
      <IonTabButton tab="study" href={pageRoutes.study()}>
        <IonIcon className="selected-state p-1" icon={iconBookFilled} />
        <IonIcon className="unselected-state p-1" icon={iconBook} />
        <IonLabel>Mein Studium</IonLabel>
      </IonTabButton>
      <IonTabButton tab="maps" href={pageRoutes.map()}>
        <IonIcon className="selected-state p-1" icon={iconMapFilled} />
        <IonIcon className="unselected-state p-1" icon={iconMap} />
        <IonLabel>Karten</IonLabel>
      </IonTabButton>
      <IonTabButton tab="profile" href={pageRoutes.settings()}>
        <IonIcon className="selected-state p-1" icon={iconSettingsFilled} />
        <IonIcon className="unselected-state p-1" icon={iconSettings} />
        <IonLabel>Einstellungen</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default TabBar;
