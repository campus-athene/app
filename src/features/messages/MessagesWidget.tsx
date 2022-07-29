import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Envelope } from '../../icons';
import Widget from '../common/Widget';
import MessageList from './MessageList';
import { selectUnreadMessages } from './messagesSlice';

const MessagesWidget = () => {
  const navigate = useNavigate();
  const unreadMsgs = useSelector(selectUnreadMessages());
  const unreadMsgCount = unreadMsgs.length;

  const numberMsgsShow = unreadMsgCount > 4 ? 3 : unreadMsgCount;
  const moreMsgs = unreadMsgCount > 4;

  if (numberMsgsShow === 0) return null;

  return (
    <Widget style={{ overflow: 'hidden', padding: 0 }}>
      <MessageList
        messages={unreadMsgs.slice(0, numberMsgsShow).reverse()}
        unreadIndicators={false}
      />
      {moreMsgs && (
        <div
          onClick={() => navigate('/messages')}
          style={{
            fontSize: '1.2em',
            padding: '1em',
            borderTop: '1px solid rgba(0,0,0,.125)',
          }}
        >
          <Envelope
            style={{
              display: 'inline-block',
              marginRight: '0.5em',
              width: '2em',
            }}
          />
          {unreadMsgCount - numberMsgsShow} weitere neue Nachrichten
        </div>
      )}
    </Widget>
  );
};

export default MessagesWidget;
