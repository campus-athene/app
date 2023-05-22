import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageFrame from '../../components/PageFrame';
import { useDocuments, UserNotLoggedInError } from '../../provider/camusnet';
import CampusNetLoginTeaser from '../auth/CampusNetLoginTeaser';

const DocumentsPage = () => {
  const { isError, isLoading, data, error } = useDocuments();

  if (error instanceof UserNotLoggedInError)
    return <CampusNetLoginTeaser title="Dokumente" />;

  return (
    <PageFrame title="Dokumente" syncState={{ isLoading, isOffline: isError }}>
      {data &&
        data.map((d) => (
          <div
            className="flex"
            key={d.createdDateStr + d.createdTimeStr + d.name}
            onClick={() => {
              d.link && window.open(d.link, '_blank');
            }}
            style={{
              borderBottom: '1px solid lightgray',
              padding: '0.5em 1em',
            }}
          >
            <div className="flex min-w-0 flex-grow flex-col">
              <div className="text-sm">
                {d.createdDateStr} {d.createdTimeStr}
              </div>
              <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                {d.name}
              </div>
            </div>
            {d.link ? (
              <svg
                className="w-4 flex-shrink-0 self-center"
                viewBox="0 0 16 17"
              >
                <path
                  d="M13 6.5L8 11.5M8 11.5L3 6.5M8 11.5V1.5M1 15.5H15"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            ) : (
              <FontAwesomeIcon
                className="w-4 flex-shrink-0 animate-spin self-center"
                icon={faSpinner}
              />
            )}
          </div>
        ))}
    </PageFrame>
  );
};

export default DocumentsPage;
