import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import PageFrame from '../common/PageFrame';
import { selectIsLoading, selectSubscribedArticles, update } from './newsSlice';

const BrowseNewsPage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading());
  const articles = useAppSelector(selectSubscribedArticles());

  useEffect(() => {
    dispatch(update());
  }, [dispatch]);

  return (
    <PageFrame title="Aktuelles" syncState={{ isLoading, isOffline: false }}>
      {articles.map((a) => (
        <div
          key={a.guid}
          onClick={() => window.open(a.link, '_blank')}
          style={{ borderBottom: '1px solid lightgray', padding: '0.5em 1em' }}
        >
          <div style={{ fontSize: '0.75em' }}>
            {new Date(a.isoDate).toLocaleDateString('de-DE', {
              dateStyle: 'full',
            })}
          </div>
          <div
            style={{
              display: '-webkit-box',
              fontWeight: 'bold',
              maxHeight: '3em',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
            }}
          >
            {a.title}
          </div>
          <div
            style={{
              display: '-webkit-box',
              maxHeight: '4.5em',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
            }}
          >
            {a.content}
          </div>
        </div>
      ))}
    </PageFrame>
  );
};

export default BrowseNewsPage;
