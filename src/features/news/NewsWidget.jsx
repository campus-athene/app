import { Carousel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Widget from '../common/Widget';
import { selectSubscribedArticles } from './newsSlice';

const NewsWidget = () => {
  const news = useSelector(selectSubscribedArticles());
  return (
    !!news && (
      <Carousel controls={false} interval={10000} variant="dark">
        {news.slice(0, 5).map((a) => (
          <Carousel.Item>
            <Widget
              onClick={() => window.open(a.link, '_blank')}
              style={{ height: '10.75em' }}
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
            </Widget>
          </Carousel.Item>
        ))}
      </Carousel>
    )
  );
};

export default NewsWidget;
