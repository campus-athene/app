import { utc } from 'moment-timezone';
import { useState } from 'react';
import { Message } from '../../provider/camusnet/messages';
import MessageDialog from './MessageDialog';
import Sanitize from './Sanitize';

const MessageList = (props: {
  itemStyle?: React.CSSProperties;
  messages: Message[];
  unreadIndicators?: boolean;
}) => {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);

  return (
    <div className="divide-y">
      {props.messages.map(
        ({ messageId: id, subject, body, from, sent, unread }) => (
          <div
            className="px-4 py-2"
            key={id}
            onClick={() => setSelectedMessage(id)}
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
              <div className="flex-grow truncate text-xs font-semibold">
                {from}
              </div>
              <div className="flex-shrink-0 text-xs">
                {utc(sent).local().locale('de-DE').fromNow()}
              </div>
            </div>
            <Sanitize className="truncate text-sm">{subject}</Sanitize>
            <Sanitize className="text-sm text-neutral-500 line-clamp-2">
              {body}
            </Sanitize>
          </div>
        )
      )}
      <MessageDialog
        messageId={selectedMessage}
        onClose={() => setSelectedMessage(null)}
      />
    </div>
  );
};

export default MessageList;
