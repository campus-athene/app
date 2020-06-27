import React from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { ListGroup, Modal, Button, Row } from 'react-bootstrap';
import PageFrame from '../common/PageFrame';

const MessagesPage = ({ messages }) => {
  const history = useHistory();
  const selected = messages[useParams().id];

  const renderModal = ({ subject, from, date, time, body }) => (
    <Modal show centered scrollable>
      <Modal.Header style={{ display: 'block' }}>
        <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{subject}</div>
        <div>{date} {time} - {from}</div>
      </Modal.Header>
      <Modal.Body>
        <p style={{ overflowWrap: 'anywhere' }}>
          {body.split(/\r?\n/).reduce((a, p, i) => [...a, ...(i ? [<br />] : []), p])}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => history.goBack()}>Schließen</Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <PageFrame title="Nachrichten">
      <Row>
        <ListGroup variant="flush">
          {Object.values(messages).reverse().map(({ id, subject, from, date, unread }) =>
            <ListGroup.Item key={id} action onClick={() => history.push(`/messages/${id}`)}>
              <div style={{ fontSize: '1.2em', fontWeight: unread ? 'bold' : 'normal' }}>{subject}</div>
              <div>{date}: {from}</div>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Row>
      {selected ? renderModal(selected) : null}
    </PageFrame>
  );
}

export default connect(
  state => ({ messages: state.messages })
)(MessagesPage);
