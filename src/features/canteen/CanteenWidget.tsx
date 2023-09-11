import moment from 'moment-timezone';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ScrollWidget, WidgetBox } from '../home/Widget';
import { useMenuItems } from './canteenData';
import { canteenFriendlyName, selectCanteen } from './canteenSettings';
import DishTypeImage from './DishTypeImage';
import foodPlaceholder from './foodPlaceholder.svg';
import Star from './Star';

const CanteenWidget = () => {
  const now = moment().tz('Europe/Berlin');
  const tod = now.hour() + now.minute() / 60;
  if (tod < 4 || tod > 14.5) return null;
  if ([6, 7].includes(now.isoWeekday())) return null;
  return <CanteenWidgetContent />;
};

const CanteenWidgetContent = () => {
  const history = useHistory();
  const canteenId = useSelector(selectCanteen());
  const { data } = useMenuItems({ canteenId, days: 1 });

  if (!data || !data.menuItems.length) return null;

  return (
    <ScrollWidget
      onClick={() => history.push('/canteen')}
      title={canteenFriendlyName[canteenId]}
    >
      {data.menuItems.map((m) => (
        <WidgetBox
          className="relative h-32 w-48 flex-shrink-0 overflow-hidden bg-cover bg-center bg-no-repeat"
          key={m.id}
          onClick={() => history.push('/canteen')}
          style={{
            backgroundImage: `url('${foodPlaceholder}')`,
          }}
        >
          <img
            alt=""
            className="absolute inset-0 top-auto w-full object-cover"
            src={m.dish.image?.thumbUrl}
            style={{
              maxHeight: '10rem',
              minHeight: '8rem',
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 flex flex-col overflow-hidden rounded-b-2xl bg-black bg-opacity-50 p-2 text-xs text-white"
            style={
              {
                '--bs-bg-opacity': '0.5',
                backdropFilter: 'blur(2px)',
                WebkitBackdropFilter: 'blur(2px)',
              } as any
            }
          >
            <div className="flex items-baseline gap-0.5">
              <Star shine={true} />
              <Star shine={m.dish.rating > 1} />
              <Star shine={m.dish.rating > 2} />
              <Star shine={m.dish.rating > 3} />
              <Star shine={m.dish.rating > 4} />
              <div className="flex-grow" />
              <DishTypeImage
                style={{
                  height: '1.25em',
                  alignSelf: 'start',
                  marginRight: '0.25em',
                }}
                type={m.dish.type}
              />
              <div>
                {}
                {new Intl.NumberFormat('de-DE', {
                  style: 'currency',
                  currency: 'EUR',
                }).format(m.dish.price)}
              </div>
            </div>
            <div className="line-clamp-2">{m.dish.name}</div>
          </div>
        </WidgetBox>
      ))}
    </ScrollWidget>
  );
};

export default CanteenWidget;
