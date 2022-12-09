import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Widget from '../home/Widget';
import { Envelope } from '../sideMenu/icons';
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
    <Widget
      onClick={() => navigate('/messages')}
      style={{ overflow: 'hidden', padding: 0 }}
      title={
        unreadMsgCount === 1
          ? 'Eine ungelesene Nachricht'
          : `${unreadMsgCount} ungelesene Nachrichten`
      }
    >
      <MessageList
        itemStyle={{ padding: '0.5rem' }}
        messages={unreadMsgs.slice(-numberMsgsShow).reverse()}
        unreadIndicators={false}
      />
      {moreMsgs && (
        <div
          onClick={() => navigate('/messages')}
          style={{
            fontSize: '1.2em',
            padding: '0.5rem',
            borderTop: '1px solid rgba(0,0,0,.125)',
          }}
        >
          <Envelope
            style={{
              verticalAlign: '-40%',
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
