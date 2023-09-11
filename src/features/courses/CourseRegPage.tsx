import * as cn from '@campus/campusnet-sdk';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ContextMenuItem } from '../../components/ContextMenu';
import PageFrame from '../../components/PageFrame';
import { useCourseOffers } from '../../provider/camusnet/courses';
import { getCourseColor } from './coursesSlice';

const OfferList = (params: {
  list?: Partial<cn.OfferList>;
  parentPath?: string[];
}) => {
  const path = [
    ...(params.parentPath || []),
    ...(params.list?.name ? [params.list.name] : []),
  ];
  const navigate = useNavigate();
  const offersQuery = useCourseOffers(
    params.list?.majorId,
    params.list?.areaId,
    params.list?.listId,
  );

  return (
    <>
      {/* Mainly on sublists the first name can be empty. */}
      {/* If there are no modules and no lists that can be opened in a new
      page but sublists exist that will be expanded, the header would be
      followed directly be another header. Therefore in this case we will
      hide this header. If there are no modules and no lists at all, the
      header would not be followed by another header directly because an
      information messages will be displayed stating that there are no
      offers available in this list. */}
      {path.length &&
      (!offersQuery.data ||
        !(
          offersQuery.data.modules.length === 0 &&
          !offersQuery.data.lists.some(({ listId }) => listId) &&
          offersQuery.data.lists.length > 0
        )) ? (
        <div className="bg-neutral-100 px-4 py-2">
          {path.map((p, i) => (
            <>
              {i > 0 ? (
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className="mx-2 text-gray-400"
                />
              ) : null}
              {p}
            </>
          ))}
        </div>
      ) : null}
      {offersQuery.isLoading ? (
        <div className="px-4 py-2 text-center text-gray-600">
          Daten werden
          <br />
          geladen&hellip;
        </div>
      ) : offersQuery.isError ? (
        <div className="px-4 py-2 text-red-600">
          Fehler:
          <br />
          {String(offersQuery.error)}
        </div>
      ) : (
        <>
          {offersQuery.data?.modules.length === 0 &&
          offersQuery.data?.lists.length === 0 ? (
            <div className="px-4 py-2 text-center text-gray-600">
              Keine Angebote in
              <br />
              diesem Bereich.
            </div>
          ) : (
            offersQuery.data?.modules.map(
              ({ moduleId, number, name, lecturer }) => (
                <div
                  key={moduleId}
                  className="relative px-4 py-2"
                  onClick={() =>
                    navigate(
                      `/courses/register/${offersQuery.data.path.at(-1)
                        ?.majorId}/${offersQuery.data.path.at(-1)
                        ?.areaId}/${offersQuery.data.path.at(-1)
                        ?.listId}/${moduleId}`,
                    )
                  }
                >
                  <div
                    style={{
                      background: getCourseColor({ number }, 90, 70),
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
                    <span style={{ fontFamily: 'monospace' }}>{number}</span>
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
                    {name}
                  </div>
                </div>
              ),
            )
          )}
          {offersQuery.data?.lists
            .filter(({ listId }) => listId)
            .map(({ majorId, areaId, listId, name }) => (
              <div
                key={`${majorId}.${areaId}.${listId}`}
                className="flex gap-2 px-4 py-2"
                onClick={() =>
                  navigate(`/coursereg/${majorId}/${areaId}/${listId}`)
                }
              >
                <div style={{ flexGrow: '1', flexShrink: '1' }}>{name}</div>
                <div style={{ alignSelf: 'center' }}>
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
              </div>
            ))}
          {offersQuery.data?.lists
            .filter(({ listId }) => !listId)
            .map((list) => <OfferList list={list} parentPath={path} />)}
        </>
      )}
    </>
  );
};

const CourseRegPage = () => {
  const params = useParams();

  // If major is not in the params, we offer the user to select a major.
  const [selectedMajor, setSelectedMajor] = useState(0);

  const offerMajorSelection = params.major === undefined;

  const majorId = params.major ? Number.parseInt(params.major) : selectedMajor;
  const areaId = params.area ? Number.parseInt(params.area) : undefined;
  const listId = params.rootList ? Number.parseInt(params.rootList) : undefined;

  // If no major was provided in the params, we need to query the
  // available majors to offer the user to select one.
  const query = useCourseOffers(majorId, areaId, listId);

  const ContextMenu =
    offerMajorSelection && query.data
      ? () => (
          <>
            {query.data &&
              query.data.majors.map(({ majorId, name }) => (
                <ContextMenuItem onClick={() => setSelectedMajor(majorId)}>
                  {name}
                </ContextMenuItem>
              ))}
          </>
        )
      : null;

  return (
    <PageFrame
      title={
        !query.data
          ? 'Anmeldung'
          : offerMajorSelection
          ? (selectedMajor
              ? query.data.majors.find(
                  ({ majorId }) => majorId === selectedMajor,
                )
              : query.data.majors[0]
            )?.name
          : query.data.path.at(-1)?.name
      }
      more={ContextMenu ? <ContextMenu /> : undefined}
      moreIcon={faAngleDown}
    >
      <OfferList
        list={{
          majorId,
          areaId,
          listId,
        }}
      />
    </PageFrame>
  );
};

export default CourseRegPage;
