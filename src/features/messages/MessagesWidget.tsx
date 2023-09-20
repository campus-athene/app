import { useHistory } from 'react-router';
import pageRoutes from '../../app/pageRoutes';
import Widget from '../home/Widget';
import { Envelope } from './icons';
import MessageList from './MessageList';
import { useMessages } from './messageModel';

const MessagesWidget = () => {
  const history = useHistory();

  const { data } = useMessages();

  if (!data) return null;

  const unreadMsgs = data.filter((m) => !m.read);
  const unreadMsgCount = unreadMsgs.length;

  const numberMsgsShow = unreadMsgCount > 4 ? 3 : unreadMsgCount;
  const moreMsgs = unreadMsgCount > 4;

  if (numberMsgsShow === 0) return null;

  return (
    <Widget
      onClick={() => history.push(pageRoutes.messages())}
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
          onClick={() => history.push(pageRoutes.messages())}
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
