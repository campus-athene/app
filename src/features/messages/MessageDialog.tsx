import { utc } from 'moment-timezone';
import { useEffect, useRef, useState } from 'react';
import Button from '../../components/Button';
import CardModal from '../../components/CardModal';
import { TucanLogo } from '../../components/Logo';
import { useSetMessageStatus } from '../../provider/camusnet/messages';
import { useCoreMessageMarkNotificationRead } from '../../provider/moodle';
import { Message } from './messageModel';
import moodleIcon from './moodle.svg';
import Sanitize from './Sanitize';
import './style.css';

// prettier-ignore
const allowedTags = [
  "address", "article", "aside", "footer", "header", "h1", "h2", "h3", "h4",
  "h5", "h6", "hgroup", "main", "nav", "section", "blockquote", "dd", "div",
  "dl", "dt", "figcaption", "figure", /*"hr",*/ "li", "main", "ol", "p", "pre",
  "ul", "a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn",
  "em", "i", "kbd", "mark", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp",
  "small", "span", "strong", "sub", "sup", "time", "u", "var", "wbr", "caption",
  "col", "colgroup", /*"table", "tbody", "td", "tfoot", "th", "thead", "tr",*/
];

const MessageDialog = ({
  message,
  onClose,
}: {
  message: Message | null;
  onClose: React.ReactEventHandler<{}>;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [savedMessage, setSavedMessage] = useState<Message | null>(null);
  useEffect(() => {
    if (message) {
      // Save messageId so that the message will still be displayed while the dialog closes.
      setSavedMessage(message);
      // Reset scroll to top.
      modalRef.current?.scrollTo({ top: 0 });
    }
  }, [message]);

  const renderMessage = message || savedMessage;
  return (
    <CardModal
      open={!!message}
      onClose={onClose}
      PaperProps={{ ref: modalRef }}
    >
      {renderMessage && (
        <DialogContent message={renderMessage} onClose={onClose} />
      )}
    </CardModal>
  );
};

const DialogContent = ({
  message,
  onClose,
}: {
  message: Message;
  onClose: React.ReactEventHandler<{}>;
}) => {
  const { mutate: setCampusNetMsgRead } = useSetMessageStatus();
  const { mutate: setMoodleMsgRead } = useCoreMessageMarkNotificationRead();

  // Hook must not return a value.
  useEffect(() => {
    if (message.source === 'campusnet' && !message.read)
      setCampusNetMsgRead({ messageId: message.id });
    if (message.source === 'moodle') setMoodleMsgRead(message.id);
  }, [
    message.source,
    message.read,
    message.id,
    setCampusNetMsgRead,
    setMoodleMsgRead,
  ]);

  const { subject, sender, sent, preview, source } = message;

  return (
    <>
      <Sanitize className="mb-1 mt-4 text-xl font-semibold">{subject}</Sanitize>
      <div className="mb-6 flex">
        <div className="flex-grow text-sm text-neutral-500">
          {sender}
          <br />
          {utc(sent).local().locale('de-DE').format('LLLL')}
          <br />
          {source === 'campusnet'
            ? 'TUCaN'
            : source === 'moodle'
            ? 'Moodle'
            : null}
        </div>
        {source === 'campusnet' ? (
          <TucanLogo className="ml-2 h-8 w-8 flex-shrink-0" />
        ) : source === 'moodle' ? (
          <img alt="" className="ml-2 h-8 w-8 flex-shrink-0" src={moodleIcon} />
        ) : null}
      </div>
      {source === 'campusnet' ? (
        preview
          .split(/\r?\n(?:\s*\r?\n)+/)
          .map((p) => p.replaceAll(/\r?\n/g, '<br />'))
          .map((v, i) => (
            <Sanitize
              key={i}
              as="p"
              className="mb-2 select-text break-words"
              options={{}} // Setting options to {} to allow standard tags.
            >
              {v}
            </Sanitize>
          ))
      ) : (
        <Sanitize className="moodle-message-content" options={{ allowedTags }}>
          {preview}
        </Sanitize>
      )}
      <Button className="mt-8" onClick={onClose}>
        Schließen
      </Button>
    </>
  );
};

export default MessageDialog;
