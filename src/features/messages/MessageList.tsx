import { utc } from 'moment-timezone';
import { useState } from 'react';
import { TucanLogo } from '../../components/Logo';
import MessageDialog from './MessageDialog';
import { Message } from './messageModel';
import moodleIcon from './moodle.svg';
import Sanitize from './Sanitize';

const MessageList = (props: {
  itemStyle?: React.CSSProperties;
  messages: Message[];
  unreadIndicators?: boolean;
}) => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  return (
    <div className="divide-y">
      {props.messages
        .map((m) => [m, m])
        .map(([m, { id, source, sender, subject, preview, sent, read }]) => (
          <div
            className="px-4 py-3"
            key={id}
            onClick={() => setSelectedMessage(m)}
            style={props.itemStyle}
          >
            <div className="flex items-baseline text-sm">
              {!read && props.unreadIndicators !== false && (
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
              <div className="flex-grow truncate font-medium">{sender}</div>
              <div className="flex-shrink-0 text-neutral-500">
                {utc(sent).local().locale('de-DE').fromNow()}
              </div>
              {source === 'campusnet' ? (
                <TucanLogo className="ml-1 w-3 flex-shrink-0" />
              ) : source === 'moodle' ? (
                <img
                  alt=""
                  className="ml-1 w-3 flex-shrink-0"
                  src={moodleIcon}
                />
              ) : null}
            </div>
            <Sanitize className="truncate font-medium">{subject}</Sanitize>
            <Sanitize className="line-clamp-2 text-neutral-500">
              {preview}
            </Sanitize>
          </div>
        ))}
      <MessageDialog
        message={selectedMessage}
        onClose={() => setSelectedMessage(null)}
      />
    </div>
  );
};

export default MessageList;
