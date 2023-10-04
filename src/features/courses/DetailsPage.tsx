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
import { MouseEventHandler, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { log } from '../../app/errorReporting';
import { Module, useCourseOffers } from '../../provider/camusnet/courses';
import {
  useCoreCoursesGetCourses,
  useCoreWebserviceGetSiteInfo,
  useToolMobileGetAutologinKey,
} from '../../provider/moodle';
import { CoreCourseSummaryData } from '../../provider/moodle/types';
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

  const coursesQuery = useCoreCoursesGetCourses({ classification: 'all' });
  const moodleCourses = coursesQuery.data?.courses.filter((mc) => {
    const id = Number.parseInt(mc.idnumber);
    if (!id) return false;
    return module?.courses.map((cc) => cc.courseId).includes(id);
  });
  const autologinQuery = useToolMobileGetAutologinKey();
  const siteInfoQuery = useCoreWebserviceGetSiteInfo();

  const openCourse = (course: CoreCourseSummaryData) => {
    if (!autologinQuery.data || !siteInfoQuery.data) return;
    if (!autologinQuery.data.autologinurl || !autologinQuery.data.key) {
      window.open(course.viewurl, '_blank');
    }
    const autologin = autologinQuery.data;
    const userid = siteInfoQuery.data.userid.toString();
    const url = new URL(autologin.autologinurl);
    url.searchParams.append('userid', userid);
    url.searchParams.append('key', autologin.key);
    url.searchParams.append('urltogo', course.viewurl);
    window.open(url.toString(), '_blank');
  };

  type tabs = 'overview' | 'appointments' | 'exams';
  const [tab, setTab] = useState<tabs>('overview');
  const selectedTab = tab;

  const TabButton = (props: {
    children: React.ReactNode;
    tab?: tabs;
    onClick?: MouseEventHandler<HTMLButtonElement>;
  }) => (
    <button
      className="flex-shrink-0 px-3 pb-2 pt-8 font-bold"
      style={{
        color: selectedTab === props.tab ? 'white' : '#fffa',
      }}
      onClick={props.onClick || (() => props.tab && setTab(props.tab))}
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
            {coursesQuery.isLoading ? (
              <TabButton>Moodle</TabButton>
            ) : moodleCourses?.length === 1 ? (
              <TabButton onClick={() => openCourse(moodleCourses[0])}>
                Moodle
              </TabButton>
            ) : moodleCourses && moodleCourses.length > 1 ? (
              moodleCourses.map((course) => (
                <TabButton key={course.id} onClick={() => openCourse(course)}>
                  Moodle ({course.fullname.slice(-2)})
                </TabButton>
              ))
            ) : null}
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
