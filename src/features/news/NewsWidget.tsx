import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ScrollWidget, WidgetBox } from '../home/Widget';
import { selectSubscribedArticles } from './newsSlice';

const NewsWidget = () => {
  const navigate = useNavigate();
  const news = useSelector(selectSubscribedArticles());

  if (!news) return null;

  return (
    <ScrollWidget onClick={() => navigate('/news')} title="Aktuelles">
      {news.slice(0, 5).map((a) => (
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
        </WidgetBox>
      ))}
    </ScrollWidget>
  );
};

export default NewsWidget;
