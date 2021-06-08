import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
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
      <ListGroup variant="flush" style={{ margin: '0 -15px' }}>
        {messages.reverse().map(({ id, subject, body, from, date, unread }) => (
          <ListGroup.Item
            key={id}
            action
            onClick={() => history.push(`/messages/${id}`)}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                color: '#000000',
              }}
            >
              {unread && (
                <div
                  style={{
                    width: '0.5em',
                    height: '0.5em',
                    borderRadius: '1em',
                    background: '#ffb800',
                    alignSelf: 'center',
                    margin: '0 0.3em 0 -0.8em',
                  }}
                />
              )}
              <div style={{ flexGrow: 1, flexShrink: 1, fontSize: '1.1em' }}>
                {from}
              </div>
              <div>{date}</div>
            </div>
            <div
              style={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                color: '#000000',
              }}
            >
              {subject}
            </div>
            <div
              style={{
                WebkitLineClamp: 2,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                maxHeight: '3em',
              }}
            >
              {body}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      {selectedId && <MessageDialog messageId={selectedId} />}
    </PageFrame>
  );
};

export default MessagesPage;
