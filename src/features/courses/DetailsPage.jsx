import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { selectStatusBarHeightCss } from '../common/commonSlice';
import { getCourseColor, selectBySemesterAndNumber } from './coursesSlice';
import { selectOffer } from './offersSlice';
import OverviewTab from './OverviewTab';

const DetailsPage = () => {
  const { semester, number: numberEncoded, listId, moduleId } = useParams();
  const number = numberEncoded && decodeURIComponent(numberEncoded);
  const module = useSelector(
    listId
      ? selectOffer(Number.parseInt(listId), Number.parseInt(moduleId))
      : selectBySemesterAndNumber(semester, number)
  );

  const history = useHistory();

  const statusBarHeightCss = useSelector(selectStatusBarHeightCss());

  const [tab, setTab] = useState('overview');
  const selectedTab = tab;

  const NavButton = ({ children, tab }) => (
    <button
      onClick={() => setTab(tab)}
      style={{
        background: 'none',
        border: 'none',
        color: selectedTab === tab ? 'white' : '#fffa',
        fontWeight: 'bold',
        padding: '2em 0.75em 0.5em',
      }}
    >
      {children}
    </button>
  );

  return (
    <>
      <div
        style={{
          background: getCourseColor(module, 90, 70),
          color: 'white',
          padding: `${statusBarHeightCss} 1em 0 1em`,
        }}
      >
        <div>
          <button
            onClick={() => history.goBack()}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              height: '3em',
              marginLeft: '-0.9em',
              marginTop: '-0.4em',
              padding: '0',
              width: '3em',
            }}
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L11 11M1 11L11 1"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
        <div>{module.instructor}</div>
        <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
          {module.name}
        </div>
        <div
          style={{
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            margin: '0 -1em',
            overflowY: 'scroll',
            padding: '0 0.25em',
          }}
        >
          <NavButton tab="overview">Übersicht</NavButton>
          <NavButton tab="messages">Nachrichten</NavButton>
          <NavButton tab="material">Material</NavButton>
        </div>
      </div>
      {tab === 'overview' && <OverviewTab module={module} />}
      {tab === 'material' && (
        <button
          onClick={() =>
            (window.location.href = 'https://moodle.tu-darmstadt.de/my/')
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
      )}
    </>
  );
};

export default DetailsPage;
