import { ContextMenuItem } from '../../components/ContextMenu';
import PageFrame from '../../components/PageFrame';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import MessageList from './MessageList';
import {
  markAllRead,
  selectAllMessages,
  selectSyncState,
} from './messagesSlice';

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
  const messages = useAppSelector(selectAllMessages());

  return (
    <PageFrame
      title="Nachrichten"
      more={<ContextMenu />}
      syncState={useAppSelector(selectSyncState())}
    >
      {/* reverse() is in place, use slice() to make a copy */}
      <MessageList messages={messages.slice().reverse()} />
    </PageFrame>
  );
};

export default MessagesPage;
