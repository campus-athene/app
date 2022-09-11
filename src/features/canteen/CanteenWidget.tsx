import moment from 'moment-timezone';
import { useSelector } from 'react-redux';
import Widget from '../common/Widget';
import canteenData from './canteenData';
import { selectCanteen } from './canteenSettings';
import DishTypeImage from './DishTypeImage';
import foodPlaceholder from './foodPlaceholder.svg';
import Star from './Star';

const CanteenWidget = () => {
  const now = moment().tz('Europe/Berlin');
  const tod = now.hour() + now.minute() / 60;
  if (tod < 4 || tod > 14.5) return null;
  if ([0, 6].includes(now.weekday())) return null;
  return <CanteenWidgetContent />;
};

const CanteenWidgetContent = () => {
  const canteenId = useSelector(selectCanteen());
  const { data } = canteenData.useMenuItemsQuery({ canteenId, days: 1 });

  if (!data) return null;

  return (
    <div className="flex no-scrollbar overflow-x-scroll px-3 gap-2">
      {data.menuItems.map((m) => (
        <Widget
          className="bg-center bg-cover bg-no-repeat flex-shrink-0 h-32 mx-0 overflow-hidden relative w-48"
          key={m.id}
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
            className="absolute bg-black bg-opacity-50 bottom-0 flex flex-col left-0 overflow-hidden p-2 right-0 rounded-b-2xl text-xs text-white"
            style={
              {
                '--bs-bg-opacity': '0.5',
                backdropFilter: 'blur(2px)',
                WebkitBackdropFilter: 'blur(2px)',
              } as any
            }
          >
            <div className="flex gap-0.5 items-baseline">
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
        </Widget>
      ))}
    </div>
  );
};

export default CanteenWidget;
