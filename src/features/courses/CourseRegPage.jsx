import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ListGroup, Button, Spinner } from 'react-bootstrap';
import { selectIsLoaded, selectIsOffline, selectErrorMessage } from '../../redux/sync';
import PageFrame from '../common/PageFrame';
import { selectLists } from './offersSlice';
import CourseRegModal from './CourseRegModal';

const CourseRegPage = () => {
  const syncState = {
    loaded: useSelector(selectIsLoaded),
    offline: useSelector(selectIsOffline),
    error: useSelector(selectErrorMessage),
  }
  const lists = useSelector(selectLists);
  const [openedOffer, setOpenedOffer] = useState();

  if (!syncState.loaded || syncState.offline) {
    return (
      <PageFrame title="Anmeldung">
        <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          {
            !syncState.loaded ?
              <Spinner animation="grow" variant="dark" /> :
              syncState.offline ?
                <>Offline</> :
                syncState.error ||
                console.error("Unknown sync state in CoursePageReg") || "Da ist wohl technisch was schief gegangen :-("
          }
        </div>
      </PageFrame>
    );
  }

  return (
    <PageFrame title="Anmeldung">
      {lists.map(({ id: listId, title, modules }) =>
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
