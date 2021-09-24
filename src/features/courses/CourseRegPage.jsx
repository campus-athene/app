import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import PageFrame from '../common/PageFrame';
import { getCourseColor } from './coursesSlice';
import { loadArea, selectLists, selectSyncState } from './offersSlice';

const CourseRegPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const major = Number.parseInt(params.major);
  const area = Number.parseInt(params.area);
  const list = Number.parseInt(params.rootList);

  useEffect(
    () => dispatch(loadArea(major, area, list)),
    [major, area, list, dispatch]
  );

  const lists = useSelector(selectLists(major, area));

  return (
    <PageFrame
      title="Anmeldung"
      syncState={useSelector(selectSyncState(major, area))}
    >
      {lists
        .filter(
          ({ modules, areas }) => modules.length || (areas && areas.length)
        )
        .map(({ id, major, area, title, modules, areas }, index) => (
          <ListGroup
            key={`${major}.${area}.${id}`}
            style={{ marginLeft: '-15px', marginRight: '-15px' }}
            variant="flush"
          >
            {/* Mainly on sublists the first title can be empty. */}
            {title || index ? (
              <ListGroup.Item className="bg-light">{title}</ListGroup.Item>
            ) : null}
            {modules.map(({ id: moduleId, code, title, lecturer }) => (
              <ListGroup.Item
                key={moduleId}
                action
                onClick={() =>
                  history.push(
                    `/courses/register/${major}/${area}/${id}/${moduleId}`
                  )
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
            {(areas || []).map(({ id, major, rootList, title }) => (
              <ListGroup.Item
                key={`${major}.${id}.${rootList}`}
                action
                onClick={() =>
                  history.push(`/coursereg/${major}/${id}/${rootList}`)
                }
              >
                <div style={{ display: 'flex' }}>
                  <div style={{ flexGrow: '1', flexShrink: '1' }}>{title}</div>
                  <div style={{ alignSelf: 'center' }}>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ))}
    </PageFrame>
  );
};

export default CourseRegPage;
