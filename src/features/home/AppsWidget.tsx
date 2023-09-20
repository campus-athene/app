import { useHistory } from 'react-router-dom';
import pageRoutes from '../../app/pageRoutes';
import imgBonbon from './miniApps/bonbon.png';
import imgLithire from './miniApps/lithire.svg';
import imgMensa from './miniApps/mensa.png';
import imgTufind from './miniApps/tufind.png';
import imgUsz from './miniApps/usz.png';

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
  return (
    <div className="mx-4 my-8 flex justify-around">
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
      <Icon src={imgLithire} title="lithire" transform="scale(2.4)" />
    </div>
  );
};

export default AppsWidget;
