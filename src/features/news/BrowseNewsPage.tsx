import { useEffect } from 'react';
import PageFrame from '../../components/PageFrame';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectIsLoading, selectSubscribedArticles, update } from './newsSlice';

const BrowseNewsPage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading());
  const articles = useAppSelector(selectSubscribedArticles());

  useEffect(() => {
    dispatch(update());
  }, [dispatch]);

  return (
    <PageFrame
      className="divide-y"
      title="Aktuelles"
      syncState={{ isLoading, isOffline: false }}
    >
      {articles.map((a) => (
        <div
          className="px-4 py-3"
          key={a.guid}
          onClick={() => window.open(a.link, '_blank')}
        >
          <div className="mb-1 text-sm">
            {new Date(a.isoDate).toLocaleDateString('de-DE', {
              dateStyle: 'full',
            })}
          </div>
          <div className="mb-1 font-semibold line-clamp-2">{a.title}</div>
          <div className="text-neutral-600 line-clamp-3">{a.content}</div>
        </div>
      ))}
    </PageFrame>
  );
};

export default BrowseNewsPage;
