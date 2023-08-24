import { ContextMenuItem } from '../../components/ContextMenu';
import PageFrame from '../../components/PageFrame';
import { UserNotLoggedInError } from '../../provider/camusnet';
import CampusNetLoginTeaser from '../auth/CampusNetLoginTeaser';
import MessageList from './MessageList';
import { useMarkAllMessagesRead, useMessages } from './messageModel';

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
      <MessageList messages={data || []} />
    </PageFrame>
  );
};

export default MessagesPage;
