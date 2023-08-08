import { useNavigate } from 'react-router-dom';
import { ScrollWidget, WidgetBox } from '../home/Widget';
import asta from './logos/asta.png';
import tu from './logos/tu.png';
import ulb from './logos/ulb.png';
import { useFeeds } from './newsData';

const NewsWidget = () => {
  const navigate = useNavigate();

  const feeds = useFeeds(['general', 'ulb', 'asta']);

  const articles = feeds
    .flatMap((f) => f.data ?? [])
    .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  if (!articles.length) return null;

  return (
    <ScrollWidget onClick={() => navigate('/news')} title="Aktuelles">
      {articles.slice(0, 5).map((a) => (
        <WidgetBox
          key={a.guid}
          onClick={() => window.open(a.link, '_blank')}
          style={{
            flexShrink: 0,
            height: '9.75em',
            padding: '0.5rem',
            width: 'min(18rem, 100vw - 4rem)',
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
          <div className="line-clamp-2 font-semibold">{a.title}</div>
          <div className="line-clamp-3 text-neutral-600">{a.description}</div>
        </WidgetBox>
      ))}
    </ScrollWidget>
  );
};

export default NewsWidget;
