import { useParams } from 'react-router-dom';
import PageFrame from '../../components/PageFrame';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import MessageDialog from './MessageDialog';
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
    <div className="divide-y">
      <div
        className="px-4 py-3 text-lg"
        onClick={() => dispatch(markAllRead())}
      >
        Alle als gelesen markieren
      </div>
    </div>
  );
};

const MessagesPage = () => {
  const messages = useAppSelector(selectAllMessages());
  const selectedId = Number.parseInt(useParams().id || '');

  return (
    <PageFrame
      title="Nachrichten"
      more={<ContextMenu />}
      syncState={useAppSelector(selectSyncState())}
    >
      {/* reverse() is in place, use slice() to make a copy */}
      <MessageList messages={messages.slice().reverse()} />
      {selectedId && <MessageDialog messageId={selectedId} />}
    </PageFrame>
  );
};

export default MessagesPage;
