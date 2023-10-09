import { useState } from 'react';
import { useHistory } from 'react-router';
import pageRoutes from '../../app/pageRoutes';
import Widget from '../home/Widget';
import MessageDialog from './MessageDialog';
import MessageList from './MessageList';
import { Message, useMessages } from './messageModel';

const MessagesWidget = () => {
  const history = useHistory();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const { data } = useMessages();

  if (!data && !selectedMessage) return null;

  const unreadMsgs = data?.filter((m) => !m.read) || [];
  const unreadMsgCount = unreadMsgs.length;

  const numberMsgsShow = Math.min(4, unreadMsgCount);
  const moreMsgs = unreadMsgCount > 4;

  return (
    <>
      {unreadMsgCount > 0 && (
        <Widget
          onClick={() => history.push(pageRoutes.messages())}
          style={{ position: 'relative' }}
          title={
            unreadMsgCount === 1
              ? 'Eine ungelesene Nachricht'
              : `${unreadMsgCount} ungelesene Nachrichten`
          }
        >
          <MessageList
            itemStyle={{ padding: '0.5rem' }}
            messages={unreadMsgs.slice(0, numberMsgsShow)}
            unreadIndicators={false}
            style={{
              marginBottom: moreMsgs ? '-3.75rem' : 0,
            }}
            onMessageClick={(_e, message) => setSelectedMessage(message)}
          />
          {moreMsgs && (
            <div
              onClick={() => history.push(pageRoutes.messages())}
              className="absolute bottom-0 left-0 right-0 h-[3.25rem]"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,1) 95%)',
              }}
            />
          )}
        </Widget>
      )}
      <MessageDialog
        message={selectedMessage}
        onClose={() => setSelectedMessage(null)}
      />
    </>
  );
};

export default MessagesWidget;
