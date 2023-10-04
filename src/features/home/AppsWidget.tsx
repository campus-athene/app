import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import pageRoutes from '../../app/pageRoutes';
import imgBonbon from './miniApps/bonbon.png';
import dticket from './miniApps/dticket.svg';
import imgMensa from './miniApps/mensa.png';
import moodle from './miniApps/moodle.svg';
import tucan from './miniApps/tucan.svg';
import imgTufind from './miniApps/tufind.png';
import imgUsz from './miniApps/usz.png';
import wiki from './miniApps/wiki.svg';

const Icon = (props: {
  src: string;
  title: string;
  transform?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <div className="flex w-12 flex-col items-center" onClick={props.onClick}>
      <img
        className="h-10 w-10 object-contain"
        style={{ transform: props.transform }}
        src={props.src}
        alt={props.title}
      />
      <span className="mt-1 text-xs text-gray-700">{props.title}</span>
    </div>
  );
};

const AppsWidget = () => {
  const history = useHistory();

  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="mx-4 my-8 grid grid-flow-dense grid-cols-5 justify-items-center gap-y-6 overflow-hidden"
      style={{
        height: expanded ? '9rem' : '3.75rem',
      }}
    >
      <div
        className="col-start-5 flex w-12 flex-col items-center"
        onClick={() => setExpanded(!expanded)}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-10 w-10 object-contain transition-colors"
          style={{ transform: 'scale(0.7)' }}
          fill={expanded ? '#6b7280' : '#9ca3af'}
        >
          <rect width="9.5" height="9.5" x="13.25" y="1.25" rx="1.75"></rect>
          <path d="m22.733 16.763-3.496-3.496a1.753 1.753 0 0 0-2.474 0l-3.496 3.496a1.752 1.752 0 0 0 0 2.474l3.496 3.496a1.752 1.752 0 0 0 2.474 0l3.496-3.496a1.751 1.751 0 0 0 0-2.474z"></path>
          <rect width="9.5" height="9.5" x="1.25" y="1.25" rx="1.75"></rect>
          <rect width="9.5" height="9.5" x="1.25" y="13.25" rx="1.75"></rect>
        </svg>
        <span className="mt-1 text-xs text-gray-700">weitere...</span>
      </div>
      <Icon
        src={imgTufind}
        title="TUfind"
        transform="scale(0.9)"
        onClick={() =>
          window.open('https://hds.hebis.de/ulbdamobil/', '_blank')
        }
      />
      <Icon
        src={imgBonbon}
        title="Bonbon"
        transform="scale(0.8)"
        onClick={() => window.open('https://bonbon.stwda.de/', '_blank')}
      />
      <Icon
        src={imgMensa}
        title="Mensa"
        onClick={() => history.push(pageRoutes.canteen())}
      />
      <Icon
        src={imgUsz}
        title="USZ"
        onClick={() =>
          window.open(
            'https://online-anmeldung.usz.tu-darmstadt.de/angebote/aktueller_zeitraum/m.html',
            '_blank',
          )
        }
      />
      <Icon
        src={wiki}
        title="A bis Z"
        transform="scale(0.8)"
        onClick={() => history.push(pageRoutes.wiki())}
      />
      <Icon
        src={dticket}
        title="D-TICKET"
        transform="scale(0.75)"
        onClick={() =>
          window.open(
            'https://abo.ride-ticketing.de/app/login?partnerId=4343e8d5f524ae7d70fad06e2488d83a',
            '_blank',
          )
        }
      />
      <Icon
        src={tucan}
        title="TUCaN"
        transform="scale(0.85)"
        onClick={() =>
          window.open(
            'https://www.tucan.tu-darmstadt.de/scripts/mgrqispi.dll?APPNAME=CampusNet&PRGNAME=EXTERNALPAGES&ARGUMENTS=-N000000000000001,-N000344,-Awelcome',
            '_blank',
          )
        }
      />
      <Icon
        src={moodle}
        title="Moodle"
        transform="scale(0.8)"
        // In future, this should include a token for automatic login.
        onClick={() => window.open('https://moodle.tu-darmstadt.de/', '_blank')}
      />
    </div>
  );
};

export default AppsWidget;
