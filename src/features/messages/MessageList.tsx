import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Message } from './messagesSlice';

const MessageList = (props: {
  messages: Message[];
  unreadIndicators?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <ListGroup variant="flush">
      {props.messages.map(({ id, subject, body, from, date, unread }) => (
        <ListGroup.Item
          key={id}
          action
          onClick={() => navigate(`/messages/${id}`)}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              color: '#000000',
            }}
          >
            {unread && props.unreadIndicators !== false && (
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
  );
};

export default MessageList;
