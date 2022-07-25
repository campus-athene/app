import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PageFrame from '../common/PageFrame';
import MessageDialog from './MessageDialog';
import MessageList from './MessageList';
import {
  markAllRead,
  selectAllMessages,
  selectSyncState,
} from './messagesSlice';

// Must start with a capital letter as it is a React component.
const ContextMenu = () => {
  const dispatch = useDispatch();
  return (
    <ListGroup>
      <ListGroup.Item action onClick={() => dispatch(markAllRead())}>
        Alle als gelesen markieren
      </ListGroup.Item>
    </ListGroup>
  );
};

const MessagesPage = () => {
  const messages = useSelector(selectAllMessages());
  const selectedId = useParams().id;

  return (
    <PageFrame
      title="Nachrichten"
      more={ContextMenu()}
      syncState={useSelector(selectSyncState())}
    >
      <MessageList messages={messages.reverse()} />
      {selectedId && <MessageDialog messageId={selectedId} />}
    </PageFrame>
  );
};

export default MessagesPage;
