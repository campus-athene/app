import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ListGroup, Button } from 'react-bootstrap';
import PageFrame from '../common/PageFrame';
import { selectLists, selectSyncState } from './offersSlice';
import CourseRegModal from './CourseRegModal';

const CourseRegPage = () => {
  const lists = useSelector(selectLists);
  const [openedOffer, setOpenedOffer] = useState();

  return (
    <PageFrame title="Anmeldung" syncState={useSelector(selectSyncState())}>
      {lists.filter(({ modules }) => modules.length).map(({ id: listId, title, modules }) =>
        <ListGroup key={listId} style={{ marginLeft: '-15px', marginRight: '-15px' }} variant="flush">
          <ListGroup.Item className="bg-light">
            <b>{title}</b>
          </ListGroup.Item>
          {modules.map(({ id: moduleId, title, lecturer, status }) =>
            <ListGroup.Item
              key={moduleId}>
              <h5>{title}</h5>
              <h6>{lecturer}</h6>
              {status === 'register' &&
                <Button variant="outline-success" onClick={() => setOpenedOffer({ listId, moduleId })}>
                  Anmelden
                </Button>
              }
              {status === 'edit' &&
                <Button variant="outline-warning" onClick={() => setOpenedOffer({ listId, moduleId })}>
                  Ändern
                </Button>
              }
              {status === 'unregister' &&
                <Button variant="outline-danger" onClick={() => setOpenedOffer({ listId, moduleId })}>
                  Abmelden
                </Button>
              }
            </ListGroup.Item>
          )}
        </ListGroup>
      )}
      {openedOffer && <CourseRegModal listId={openedOffer.listId} moduleId={openedOffer.moduleId} onClose={() => setOpenedOffer(null)} />}
    </PageFrame>
  );
};

export default CourseRegPage;
