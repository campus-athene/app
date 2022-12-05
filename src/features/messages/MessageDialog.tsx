import { Modal, Slide } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';
import Button from '../../components/Button';
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
    <Modal open={true} onClose={() => navigate(-1)}>
      <Slide in={true} direction="up">
        <div
          className="bg-white px-4 py-6 overflow-y-scroll max-h-[80%] absolute inset-0 top-auto rounded-t-3xl"
          style={{
            boxShadow: '0 0 0.5rem 0.25rem #0002',
            paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
          }}
        >
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
        </div>
      </Slide>
    </Modal>
  );
};

export default MessageDialog;
