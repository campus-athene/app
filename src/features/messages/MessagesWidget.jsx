import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Envelope } from '../../icons';
import Widget from '../common/Widget';
import { selectUnreadCount } from './messagesSlice';

const MessagesWidget = () => {
  const navigate = useNavigate();
  const unreadMsgs = useSelector(selectUnreadCount());

  return (
    !!unreadMsgs && (
      <Widget onClick={() => navigate('/messages')}>
        <span style={{ fontSize: '1.2em' }}>
          <Envelope
            style={{
              display: 'inline-block',
              marginRight: '0.5em',
              width: '2em',
            }}
          />
          {unreadMsgs} neue Nachrichten
        </span>
      </Widget>
    )
  );
};

export default MessagesWidget;
