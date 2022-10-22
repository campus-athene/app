import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { utc } from 'moment-timezone';
import 'moment/locale/de';
import { WidgetBox, WidgetTitle } from '../home/Widget';
import eventApi from './eventApi';

const EventWidget = () => {
  const highlights = eventApi.useHighlightsQuery();

  return (
    highlights.data && (
      <div
        style={{
          marginBottom: '1rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
      >
        <WidgetTitle
          onClick={() =>
            window.open('https://events.study-campus.de/', '_blank')
          }
        >
          Veranstaltungen
        </WidgetTitle>{' '}
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2">
          {highlights.data.map((e) => (
            <WidgetBox
              key={e.id}
              className="flex flex-col lg:flex-row flex-shrink-0 overflow-clip rounded-xl text-xs lg:text-sm"
              onClick={() =>
                window.open(
                  'https://events.study-campus.de/event/' + e.id,
                  '_blank'
                )
              }
            >
              <img
                alt=""
                className="aspect-[3/2] block flex-shrink-0 lg:h-36 object-cover w-full lg:w-auto"
                src={'https://events.study-campus.de/api/image/54/' + e.image}
              />
              <div className="flex-grow min-w-0 px-2 sm:px-4">
                <div className="overflow-hidden pt-2 lg:pt-3 text-ellipsis whitespace-nowrap text-sm lg:text-xl font-medium">
                  {e.title}
                </div>
                <div className="block overflow-hidden pt-1 text-ellipsis whitespace-nowrap text-neutral-500 lg:text-lg">
                  {e.organiser.name}
                </div>
                <div className="overflow-hidden pt-1 text-ellipsis whitespace-nowrap">
                  {utc(e.date).local().locale('de').format('lll')}
                </div>
                <div className="block overflow-hidden pt-1 pb-2 lg:text-base text-ellipsis whitespace-nowrap">
                  {e.online ? (
                    <>
                      <FontAwesomeIcon
                        className="mr-1 text-neutral-500"
                        icon={faDesktop}
                      />
                      Online
                    </>
                  ) : (
                    e.venue
                  )}
                </div>
              </div>
            </WidgetBox>
          ))}
        </div>
      </div>
    )
  );
};

export default EventWidget;
