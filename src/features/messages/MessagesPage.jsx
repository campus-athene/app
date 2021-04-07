import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { ListGroup, Row } from 'react-bootstrap';
import PageFrame from '../common/PageFrame';
import MessageDialog from './MessageDialog';
import { selectAllMessages } from './messagesSlice';
import { selectSyncState } from '../../redux/sync';

const MessagesPage = () => {
  const history = useHistory();
  const messages = useSelector(selectAllMessages());
  const selectedId = useParams().id;

  return (
    <PageFrame title="Nachrichten"  syncState={useSelector(selectSyncState())}>
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
