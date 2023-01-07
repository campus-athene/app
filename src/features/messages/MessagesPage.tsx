import { ContextMenuItem } from '../../components/ContextMenu';
import PageFrame from '../../components/PageFrame';
import { useMessages, UserNotLoggedInError } from '../../provider/camusnet';
import { useAppDispatch } from '../../redux/hooks';
import CampusNetLoginTeaser from '../auth/CampusNetLoginTeaser';
import MessageList from './MessageList';
import { markAllRead } from './messagesSlice';

// Must start with a capital letter as it is a React component.
const ContextMenu = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <ContextMenuItem onClick={() => dispatch(markAllRead())}>
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
