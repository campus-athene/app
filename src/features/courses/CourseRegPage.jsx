import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PageFrame from '../common/PageFrame';
import { getCourseColor } from './coursesSlice';
import { selectLists, selectSyncState } from './offersSlice';

const CourseRegPage = () => {
  const history = useHistory();

  const lists = useSelector(selectLists);
  const [openedOffer, setOpenedOffer] = useState();

  return (
    <PageFrame title="Anmeldung" syncState={useSelector(selectSyncState())}>
      {lists
        .filter(({ modules }) => modules.length)
        .map(({ id: listId, title, modules }) => (
          <ListGroup
            key={listId}
            style={{ marginLeft: '-15px', marginRight: '-15px' }}
            variant="flush"
          >
            <ListGroup.Item className="bg-light">{title}</ListGroup.Item>
            {modules.map(({ id: moduleId, code, title, lecturer }) => (
              <ListGroup.Item
                key={moduleId}
                action
                onClick={() =>
                  history.push(`/courses/register/${listId}/${moduleId}`)
                }
              >
                <div
                  style={{
                    background: getCourseColor({ code }, 90, 70),
                    bottom: '0',
                    left: '-10em',
                    position: 'absolute',
                    top: '0',
                    width: '10.5em',
                  }}
                />
                <div
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <span style={{ fontFamily: 'monospace' }}>{code}</span>
                  &ensp;
                  {lecturer}
                </div>
                <div
                  style={{
                    fontSize: '1.25rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {title}
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ))}
    </PageFrame>
  );
};

export default CourseRegPage;
