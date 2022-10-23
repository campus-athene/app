import { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';
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
    <Modal show centered scrollable>
      <Modal.Header style={{ display: 'block' }}>
        <Sanitize
          style={{
            fontSize: '1.2em',
            fontWeight: 'bold',
          }}
        >
          {subject}
        </Sanitize>
        <div>
          {date} {time} - {from}
        </div>
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => navigate(-1)}>Schließen</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MessageDialog;
