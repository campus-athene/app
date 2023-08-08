import PageFrame from '../../components/PageFrame';
import Sanitize from '../messages/Sanitize';
import asta from './logos/asta.png';
import tu from './logos/tu.png';
import ulb from './logos/ulb.png';
import { useFeeds } from './newsData';

const BrowseNewsPage = () => {
  const feeds = useFeeds(['general', 'ulb', 'asta']);

  const articles = feeds
    .flatMap((f) => f.data ?? [])
    .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return (
    <PageFrame
      className="divide-y"
      title="Aktuelles"
      syncState={{
        isLoading: feeds.some((f) => f.isFetching),
        isOffline: feeds.some((f) => f.isError),
      }}
    >
      {articles.map((a) => (
        <div
          className="px-4 "
          key={a.guid}
          onClick={() => window.open(a.link, '_blank')}
        >
          <div className="mb-1 mt-4 flex items-center text-sm text-neutral-600">
            {a.source === 'general' ? (
              <>
                <img src={tu} alt="" className="mr-1 inline h-3" />
                <span className="flex-grow font-semibold">Universität</span>
              </>
            ) : a.source === 'ulb' ? (
              <>
                <img src={ulb} alt="" className="mr-1 inline h-3" />
                <span className="flex-grow font-semibold">Bibliothek</span>
              </>
            ) : a.source === 'asta' ? (
              <>
                <img src={asta} alt="" className="mr-1 inline h-3" />
                <span className="flex-grow font-semibold">
                  {a.author ?? 'AStA'}
                </span>
              </>
            ) : (
              <></>
            )}
            {a.pubDate.fromNow()}
          </div>
          <div className="mb-1 line-clamp-2 font-semibold">{a.title}</div>
          <div className="mb-3 line-clamp-3 text-neutral-600">
            {a.source === 'asta' ? (
              <Sanitize>{a.description}</Sanitize>
            ) : (
              a.description
            )}
          </div>
        </div>
      ))}
    </PageFrame>
  );
};

export default BrowseNewsPage;
