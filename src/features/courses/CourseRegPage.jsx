import React from 'react';
import { ListGroup, Button, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { showModal } from './regState';
import PageFrame from '../common/PageFrame';
import CourseRegModal from './CourseRegModal';

const CourseRegPage = ({ syncState, lists, showModal }) => {
  if (syncState.isLoading || syncState.isOffline || syncState.error) {
    return (
      <PageFrame title="Anmeldung">
        <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          {
            syncState.isLoading ?
              <Spinner animation="grow" variant="dark" /> :
            syncState.isOffline ?
              <>Offline</> :
            syncState.error ?
              syncState.error :
              null
          }
        </div>
      </PageFrame>
    );
  }

  return (
    <PageFrame title="Anmeldung">
      {lists.map(({ id, title, modules, courses }) =>
        <ListGroup key={id} style={{ marginLeft: '-15px', marginRight: '-15px' }} variant="flush">
          <ListGroup.Item className="bg-light">
            <b>{title}</b>
          </ListGroup.Item>
          {courses.map(({ id, title, lecturer, module, registration }) =>
            <ListGroup.Item
              key={id}>
              <h5>{title}</h5>
              <h6>{lecturer}</h6>
              {registration?.action === 'register' &&
                <Button variant="outline-success" onClick={() => showModal({ title, module, registration })}>
                  Anmelden
                </Button>
              }
              {registration?.action === 'unregister' &&
                <Button variant="outline-danger" onClick={() => showModal({ title, module, registration })}>
                  Abmelden
                </Button>
              }
            </ListGroup.Item>
          )}
        </ListGroup>
      )}
      <CourseRegModal />
    </PageFrame>
  );
};

export default connect(
  state => ({
    syncState: state.sync,
    lists: state.courseOffers
  }),
  { showModal }
)(CourseRegPage);
