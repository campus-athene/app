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
          <div className="text-sm">
            {new Date(a.isoDate).toLocaleDateString('de-DE', {
              dateStyle: 'full',
            })}
          </div>
          <div className="font-semibold line-clamp-2">{a.title}</div>
          <div className="text-neutral-600 line-clamp-3">{a.content}</div>
        </WidgetBox>
      ))}
    </ScrollWidget>
  );
};

export default NewsWidget;
