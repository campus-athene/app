import { useNavigate } from 'react-router-dom';
import { Message } from './messagesSlice';
import Sanitize from './Sanitize';

const MessageList = (props: {
  itemStyle?: React.CSSProperties;
  messages: Message[];
  unreadIndicators?: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <div className="divide-y">
      {props.messages.map(({ id, subject, body, from, date, unread }) => (
        <div
          className="px-4 py-2"
          key={id}
          onClick={() => navigate(`/messages/${id}`)}
          style={props.itemStyle}
        >
          <div className="flex items-baseline">
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
          <Sanitize
            style={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              color: '#000000',
            }}
          >
            {subject}
          </Sanitize>
          <Sanitize
            style={{
              WebkitLineClamp: 2,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              maxHeight: '3em',
            }}
          >
            {body}
          </Sanitize>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
