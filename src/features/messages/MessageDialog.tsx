import { utc } from 'moment-timezone';
import { useEffect, useRef, useState } from 'react';
import sanitizeHtml from 'sanitize-html';
import Button from '../../components/Button';
import CardModal from '../../components/CardModal';
import {
  useMessage,
  useSetMessageStatus,
} from '../../provider/camusnet/messages';
import Sanitize from './Sanitize';

const MessageDialog = ({
  messageId,
  onClose,
}: {
  messageId: number | null;
  onClose: React.ReactEventHandler<{}>;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [savedMessageId, setSavedMessageId] = useState<number | null>(null);
  useEffect(() => {
    if (messageId) {
      // Save messageId so that the message will still be displayed while the dialog closes.
      setSavedMessageId(messageId);
      // Reset scroll to top.
      modalRef.current?.scrollTo({ top: 0 });
    }
  }, [messageId]);

  const renderMessageId = messageId || savedMessageId;
  return (
    <CardModal
      open={!!messageId}
      onClose={onClose}
      PaperProps={{ ref: modalRef }}
    >
      {renderMessageId && (
        <DialogContent messageId={renderMessageId} onClose={onClose} />
      )}
    </CardModal>
  );
};

const DialogContent = ({
  messageId,
  onClose,
}: {
  messageId: number;
  onClose: React.ReactEventHandler<{}>;
}) => {
  const message = useMessage(messageId);
  const { mutate: setMessageStatus_mutate } = useSetMessageStatus();

  // Hook must not return a value.
  useEffect(() => {
    message.isSuccess && setMessageStatus_mutate({ messageId });
  }, [messageId, message.isSuccess, setMessageStatus_mutate]);

  if (!message.data) return <>Lade Nachricht...</>;

  const { subject, from, sent, body } = message.data;

  return (
    <>
      <Sanitize className="mb-1 mt-4 text-xl font-semibold">{subject}</Sanitize>
      <div className="mb-6 text-sm text-neutral-500">
        {from}
        <br />
        {utc(sent).local().locale('de-DE').format('LLLL')}
      </div>
      {body
        .split(/\r?\n(?:\s*\r?\n)+/)
        .map((p) => p.replaceAll(/\r?\n/g, '<br />'))
        .map((v, i) => (
          <p
            key={i}
            className="mb-2 select-text break-words"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(v) }}
          />
        ))}
      <Button className="mt-8" onClick={onClose}>
        Schließen
      </Button>
    </>
  );
};

export default MessageDialog;
