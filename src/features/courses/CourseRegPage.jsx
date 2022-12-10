import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import PageFrame from '../../components/PageFrame';
import { getCourseColor } from './coursesSlice';
import { loadArea, selectLists, selectSyncState } from './offersSlice';

const CourseRegPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const major = Number.parseInt(params.major);
  const area = Number.parseInt(params.area);
  const list = Number.parseInt(params.rootList);

  useEffect(() => {
    dispatch(loadArea(major, area, list));
  }, [major, area, list, dispatch]);

  const lists = useSelector(selectLists(major, area));

  return (
    <PageFrame
      className="divide-y"
      title="Anmeldung"
      syncState={useSelector(selectSyncState(major, area))}
    >
      {lists
        .filter(
          ({ modules, areas }) => modules.length || (areas && areas.length)
        )
        .map(({ id, major, area, name, modules, areas }, index) => (
          <React.Fragment key={`${major}.${area}.${id}`}>
            {/* Mainly on sublists the first title can be empty. */}
            {name || index ? (
              <div className="bg-neutral-100 px-4 py-2">{name}</div>
            ) : null}
            {modules.map(({ id: moduleId, code, name, instructor }) => (
              <div
                key={moduleId}
                className="relative px-4 py-2"
                onClick={() =>
                  navigate(
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
                  {instructor}
                </div>
                <div
                  style={{
                    fontSize: '1.25rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {name}
                </div>
              </div>
            ))}
            {(areas || []).map(({ id, major, rootList, name }) => (
              <div
                key={`${major}.${id}.${rootList}`}
                className="flex gap-2 px-4 py-2"
                onClick={() =>
                  navigate(`/coursereg/${major}/${id}/${rootList}`)
                }
              >
                <div style={{ flexGrow: '1', flexShrink: '1' }}>{name}</div>
                <div style={{ alignSelf: 'center' }}>
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
    </PageFrame>
  );
};

export default CourseRegPage;
