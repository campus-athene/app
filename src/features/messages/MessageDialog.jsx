import React, { createElement, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { markRead, selectMessageById } from './messagesSlice';

const MessageDialog = ({ messageId }) => {
  const dispatch = useDispatch();
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
        <div
          style={{
            fontSize: '1.2em',
            fontWeight: 'bold',
          }}
        >
          {subject}
        </div>
        <div>
          {date} {time} - {from}
        </div>
      </Modal.Header>
      <Modal.Body>
        {createElement(
          'p',
          {
            style: {
              overflowWrap: 'break-word',
              userSelect: 'text',
              WebkitUserSelect: 'text',
            },
          },
          ...body
            .split(/\r?\n/)
            .reduce((a, p, i) => [...a, ...(i ? [<br />] : []), p])
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => navigate(-1)}>Schließen</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MessageDialog;
