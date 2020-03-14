import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { showModal } from '../redux/courseReg';
import PageFrame from '../components/PageFrame';
import CourseRegModal from '../components/CourseRegModal';

const CourseRegPage = ({ lists, showModal }) => {
  return (
    <PageFrame title="Anmeldung">
      {lists.map(({ id, title, modules, courses }) =>
        <ListGroup key={id} style={{ marginBottom: '1rem', marginLeft: '-15px', marginRight: '-15px' }} variant="flush">
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
  state => ({ lists: state.courseOffers }),
  { showModal }
)(CourseRegPage);
