import { ModuleOffer } from '@campus/campusnet-sdk';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { log } from '../../app/errorReporting';
import { Module, useCourseOffers } from '../../provider/camusnet/courses';
import { selectStatusBarHeightCss } from '../../redux/globalSlice';
import ExamsTab from '../exams/ExamsTab';
import AppointmentsTab from './AppointmentsTab';
import { getCourseColor, useCoursesBySemesterAndNumber } from './coursesSlice';
import OverviewTab from './OverviewTab';

const DetailsPage = () => {
  const {
    semester,
    number: numberEncoded,
    major,
    area,
    list,
    module: moduleIdString,
  } = useParams<Record<string, string>>();
  const number = numberEncoded && decodeURIComponent(numberEncoded);
  const moduleId = moduleIdString && Number.parseInt(moduleIdString);

  const fromSemesterNumber = useCoursesBySemesterAndNumber(
    semester !== undefined ? Number.parseInt(semester) : undefined,
    number,
  ).data;
  const fromMajorAreaListId = useCourseOffers(
    major !== undefined ? Number.parseInt(major) : undefined,
    area !== undefined ? Number.parseInt(area) : undefined,
    list !== undefined ? Number.parseInt(list) : undefined,
  ).data?.modules.find((m) => m.moduleId === moduleId);
  const module: Module | ModuleOffer | undefined =
    fromSemesterNumber || fromMajorAreaListId;

  const statusBarHeightCss = useSelector(selectStatusBarHeightCss());

  useEffect(() => {
    if (!module)
      log('warning', 'Could not find course.', {
        semester,
        numberEncoded,
        number,
        major,
        area,
        list,
        moduleId,
      });
  }, []);

  type tabs = 'overview' | 'appointments' | 'exams';
  const [tab, setTab] = useState<tabs>('overview');
  const selectedTab = tab;

  const TabButton = (props: { children: React.ReactNode; tab: tabs }) => (
    <button
      onClick={() => setTab(props.tab)}
      style={{
        background: 'none',
        border: 'none',
        color: selectedTab === props.tab ? 'white' : '#fffa',
        fontWeight: 'bold',
        padding: '2em 0.75em 0.5em',
      }}
    >
      {props.children}
    </button>
  );

  if (!module)
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
            <IonTitle>Kursdetails</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="p-4">Dieser Kurs konnte nicht gefunden werden.</div>
        </IonContent>
      </IonPage>
    );

  return (
    <IonPage>
      <IonHeader
        style={{
          '--border-style': 'none',
          '--ion-background-color': getCourseColor(module, 90, 70),
          '--ion-toolbar-background': 'var(--ion-background-color)',
          '--ion-toolbar-color': 'white',
          background: 'var(--ion-background-color)',
        }}
      >
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
        </IonToolbar>
        <IonToolbar
          style={{
            '--padding-start': '0',
            '--padding-end': '0',
          }}
        >
          <div className="mx-4 line-clamp-1 ">{module.lecturer}</div>
          <div className="mx-4 line-clamp-1 text-lg font-bold">
            {module.name}
          </div>
          <div className="no-scrollbar flex overflow-y-scroll px-1">
            <TabButton tab="overview">Übersicht</TabButton>
            <TabButton tab="appointments">Termine</TabButton>
            <TabButton tab="exams">Prüfungen</TabButton>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {tab === 'overview' && <OverviewTab module={module} />}
        {tab === 'appointments' && <AppointmentsTab module={module} />}
        {tab === 'exams' && <ExamsTab module={module} />}
      </IonContent>
    </IonPage>
  );
};

export default DetailsPage;
