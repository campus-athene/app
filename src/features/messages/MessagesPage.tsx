import { useState } from 'react';
import { ContextMenuItem } from '../../components/ContextMenu';
import PageFrame from '../../components/PageFrame';
import { UserNotLoggedInError } from '../../provider/camusnet';
import CampusNetLoginTeaser from '../auth/CampusNetLoginTeaser';
import MessageDialog from './MessageDialog';
import MessageList from './MessageList';
import { Message, useMarkAllMessagesRead, useMessages } from './messageModel';

// Must start with a capital letter as it is a React component.
const ContextMenu = () => {
  const markAllMessagesRead = useMarkAllMessagesRead();

  return (
    <>
      <ContextMenuItem onClick={() => markAllMessagesRead()}>
        Alle als gelesen markieren
      </ContextMenuItem>
    </>
  );
};

const MessagesPage = () => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const { data, error, isError, isLoading } = useMessages();

  if (error instanceof UserNotLoggedInError)
    return <CampusNetLoginTeaser title="Nachrichten" />;

  return (
    <PageFrame
      title="Nachrichten"
      more={<ContextMenu />}
      syncState={{
        isLoading,
        isOffline: isError,
      }}
    >
      <MessageList
        messages={data || []}
        onMessageClick={(_e, message) => setSelectedMessage(message)}
      />
      <MessageDialog
        message={selectedMessage}
        onClose={() => setSelectedMessage(null)}
      />
    </PageFrame>
  );
};

export default MessagesPage;
