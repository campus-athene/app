import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { utc } from 'moment-timezone';
import 'moment/locale/de';
import { WidgetBox, WidgetTitle } from '../home/Widget';
import eventApi, { baseUrl } from './eventApi';

const EventWidget = () => {
  const highlights = eventApi.useHighlightsQuery();

  return (
    highlights.data && (
      <>
        <WidgetTitle
          className="mx-5"
          onClick={() =>
            window.open('https://events.study-campus.de/', '_blank')
          }
        >
          Veranstaltungen
        </WidgetTitle>
        <div className="mx-4 mb-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
          {highlights.data.map((e) => (
            <WidgetBox
              key={e.id}
              className="flex flex-shrink-0 flex-col text-xs lg:flex-row lg:text-sm"
              onClick={() =>
                window.open(
                  'https://events.study-campus.de/event/' + e.id,
                  '_blank',
                )
              }
            >
              <img
                alt=""
                className="block aspect-[3/2] w-full flex-shrink-0 object-cover lg:h-36 lg:w-auto"
                src={`${baseUrl}/image/54/${e.image}`}
              />
              <div className="min-w-0 flex-grow px-2 sm:px-4">
                <div className="overflow-hidden text-ellipsis whitespace-nowrap pt-2 text-sm font-medium lg:pt-3 lg:text-xl">
                  {e.title}
                </div>
                <div className="block overflow-hidden text-ellipsis whitespace-nowrap pt-1 text-neutral-500 lg:text-lg">
                  {e.organiser.name}
                </div>
                <div className="overflow-hidden text-ellipsis whitespace-nowrap pt-1">
                  {utc(e.date).local().locale('de').format('lll')}
                </div>
                <div className="block overflow-hidden text-ellipsis whitespace-nowrap pb-2 pt-1 lg:text-base">
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
      </>
    )
  );
};

export default EventWidget;
