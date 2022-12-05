import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';
import Button from '../../components/Button';
import CardModal from '../../components/CardModal';
import { useAppDispatch } from '../../redux/hooks';
import { markRead, selectMessageById } from './messagesSlice';
import Sanitize from './Sanitize';

const MessageDialog = ({ messageId }: { messageId: number }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selected = useSelector(selectMessageById(messageId));
  const { subject, from, date, time, body } = selected;

  // Hook must not return a value.
  useEffect(() => {
    messageId && dispatch(markRead(messageId));
  }, [messageId, dispatch]);

  return (
    <CardModal open={true} onClose={() => navigate(-1)}>
      <Sanitize
        style={{
          fontSize: '1.2em',
          fontWeight: 'bold',
        }}
      >
        {subject}
      </Sanitize>
      <div className="mb-4">
        {date} {time} - {from}
      </div>
      {body
        .replaceAll(/(?<!\r?\n\s*)\r?\n(?!\s*\r?\n)/g, '<br />')
        .split(/\r?\n(?:\s*\r?\n)+/)
        .map((v, i) => (
          <p
            key={i}
            className="mb-2"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(v) }}
            style={{
              overflowWrap: 'break-word',
              userSelect: 'text',
              WebkitUserSelect: 'text',
            }}
          />
        ))}
      <Button onClick={() => navigate(-1)}>Schließen</Button>
    </CardModal>
  );
};

export default MessageDialog;
