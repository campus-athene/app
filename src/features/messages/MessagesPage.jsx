import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { ListGroup, Row } from 'react-bootstrap';
import PageFrame from '../common/PageFrame';
import MessageDialog from './MessageDialog';
import { markAllRead, selectAllMessages } from './messagesSlice';
import { selectSyncState } from '../../redux/sync';

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
  const history = useHistory();
  const messages = useSelector(selectAllMessages());
  const selectedId = useParams().id;

  return (
    <PageFrame
      title="Nachrichten"
      more={ContextMenu()}
      syncState={useSelector(selectSyncState())}
    >
      <Row>
        <ListGroup variant="flush">
          {messages.reverse().map(({ id, subject, from, date, unread }) => (
            <ListGroup.Item
              key={id}
              action
              onClick={() => history.push(`/messages/${id}`)}
            >
              <div
                style={{
                  fontSize: '1.2em',
                  fontWeight: unread ? 'bold' : 'normal',
                }}
              >
                {subject}
              </div>
              <div>
                {date}: {from}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Row>
      {selectedId && <MessageDialog messageId={selectedId} />}
    </PageFrame>
  );
};

export default MessagesPage;
