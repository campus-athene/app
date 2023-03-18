import { ContextMenuItem } from '../../components/ContextMenu';
import PageFrame from '../../components/PageFrame';
import { UserNotLoggedInError } from '../../provider/camusnet';
import {
  useMarkAllMessagesRead,
  useMessages,
} from '../../provider/camusnet/messages';
import CampusNetLoginTeaser from '../auth/CampusNetLoginTeaser';
import MessageList from './MessageList';

// Must start with a capital letter as it is a React component.
const ContextMenu = () => {
  const markAllMessagesRead = useMarkAllMessagesRead();

  return (
    <>
      <ContextMenuItem onClick={() => markAllMessagesRead.mutate()}>
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
      {/* reverse() is in place, use slice() to make a copy */}
      <MessageList messages={(data || []).slice().reverse()} />
    </PageFrame>
  );
};

export default MessagesPage;
