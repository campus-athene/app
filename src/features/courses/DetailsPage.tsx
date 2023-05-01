import { ModuleOffer } from '@campus/campusnet-sdk';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { log } from '../../app/errorReporting';
import NavButton from '../../components/NavButton';
import PageFrame from '../../components/PageFrame';
import { Module, useCourseOffers } from '../../provider/camusnet/courses';
import { selectStatusBarHeightCss } from '../../redux/globalSlice';
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
  } = useParams();
  const number = numberEncoded && decodeURIComponent(numberEncoded);
  const moduleId = moduleIdString && Number.parseInt(moduleIdString);

  const fromSemesterNumber = useCoursesBySemesterAndNumber(
    semester !== undefined ? Number.parseInt(semester) : undefined,
    number
  ).data;
  const fromMajorAreaListId = useCourseOffers(
    major !== undefined ? Number.parseInt(major) : undefined,
    area !== undefined ? Number.parseInt(area) : undefined,
    list !== undefined ? Number.parseInt(list) : undefined
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
  });

  // const [tab, setTab] = useState('overview');
  // const selectedTab = tab;
  //
  // const TabButton = ({ children, tab }) => (
  //   <button
  //     onClick={() => setTab(tab)}
  //     style={{
  //       background: 'none',
  //       border: 'none',
  //       color: selectedTab === tab ? 'white' : '#fffa',
  //       fontWeight: 'bold',
  //       padding: '2em 0.75em 0.5em',
  //     }}
  //   >
  //     {children}
  //   </button>
  // );

  if (!module)
    return (
      <PageFrame title="Kursdetails">
        Dieser Kurs konnte nicht gefunden werden.
      </PageFrame>
    );

  return (
    <div
      style={{
        height: '100vh',
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
      }}
    >
      <div
        style={{
          background: getCourseColor(module, 90, 70),
          color: 'white',
          minHeight: '8em',
          padding: `${statusBarHeightCss} 1em 0 1em`,
        }}
      >
        <NavButton style={{ marginLeft: '-1rem' }} />
        <div>{module.lecturer}</div>
        <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
          {module.name}
        </div>
        {/* <div
          style={{
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            margin: '0 -1em',
            overflowY: 'scroll',
            padding: '0 0.25em',
          }}
        >
          <TabButton tab="overview">Übersicht</TabButton>
          <TabButton tab="messages">Nachrichten</TabButton>
          <TabButton tab="material">Material</TabButton>
        </div> */}
      </div>
      {
        //tab === 'overview' &&
        <OverviewTab module={module} />
      }
      {/* {tab === 'material' && (
        <button
          onClick={() =>
            window.open('https://moodle.tu-darmstadt.de/my/', '_blank')
          }
          style={{
            background: '#f5a300',
            border: 'none',
            borderRadius: '0.5em',
            color: 'white',
            fontWeight: 'bold',
            left: '0',
            lineHeight: '2.5em',
            margin: '2em auto 0 auto',
            position: 'absolute',
            right: '0',
            width: '12em',
          }}
        >
          Moodle öffnen
        </button>
      )} */}
    </div>
  );
};

export default DetailsPage;
