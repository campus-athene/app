import { Carousel } from 'react-bootstrap';
import Widget from '../common/Widget';
import canteenData from './canteenData';

const CanteenWidget = () => {
  const { data } = canteenData.useMenuItemsQuery({ canteenId: '1' });

  if (!data) return null;

  return (
    <Carousel controls={false} interval={10000} variant="dark">
      {data.menuItems.map((m) => (
        <Carousel.Item key={m.id}>
          <Widget>
            <img
              src={m.dish.image?.thumbUrl}
              style={{ height: '6rem', margin: '0 auto' }}
            />
            <div>{new Date(m.date * 1000).toLocaleString()}</div>
            <div>{m.dish.name}</div>
          </Widget>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CanteenWidget;
