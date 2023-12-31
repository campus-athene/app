import { useHistory } from 'react-router-dom';
import pageRoutes from '../../app/pageRoutes';
import Widget from '../home/Widget';
import Sanitize from '../messages/Sanitize';
import asta from './logos/asta.png';
import tu from './logos/tu.png';
import ulb from './logos/ulb.png';
import { useFeeds } from './newsData';

const NewsWidget = () => {
  const history = useHistory();

  const feeds = useFeeds(['general', 'ulb', 'asta']);

  const articles = feeds
    .flatMap((f) => f.data ?? [])
    .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  if (!articles.length) return null;

  return (
    <Widget
      className="divide-y"
      onClick={() => history.push(pageRoutes.news())}
      title="Aktuelles"
    >
      {articles.slice(0, 10).map((a) => (
        <div
          key={a.guid}
          onClick={() => window.open(a.link, '_blank')}
          style={{
            height: '9.75em',
            padding: '0.5rem',
          }}
        >
          <div className="flex text-sm">
            <span className="flex-grow">{a.pubDate.fromNow()}</span>
            <img
              src={
                a.source === 'general'
                  ? tu
                  : a.source === 'ulb'
                  ? ulb
                  : a.source === 'asta'
                  ? asta
                  : undefined
              }
              alt=""
              className="h-3"
            />
          </div>
          <div className="line-clamp-5">
            <span className="font-semibold">{a.title}</span>
            <br />
            {a.source === 'asta' ? (
              <Sanitize as="span" className="text-neutral-600">
                {a.description}
              </Sanitize>
            ) : (
              <span className="text-neutral-600">{a.description}</span>
            )}
          </div>
        </div>
      ))}
    </Widget>
  );
};

export default NewsWidget;
