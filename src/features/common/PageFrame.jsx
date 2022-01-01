import { useSelector } from 'react-redux';
import { Navbar, OverlayTrigger, Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { selectStatusBarHeightCss } from './commonSlice';
import NavButton from './NavButton';

const PageFrame = ({
  children,
  title,
  style,
  noMenu,
  more,
  syncState: { isLoading, isOffline } = { isLoading: false, isOffline: false },
}) => {
  const statusBarHeightCss = useSelector(selectStatusBarHeightCss());

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto auto 1fr',
        height: '100vh',
      }}
    >
      <Navbar
        variant="dark"
        style={{
          backgroundColor: '#372649',
          paddingTop: `calc(0.5rem + ${statusBarHeightCss})`,
          width: '100vw',
        }}
      >
        <NavButton
          as={Navbar.Brand}
          style={{
            alignItems: 'center',
            alignSelf: 'stretch',
            margin: '-0.5rem 0',
            display: noMenu ? 'none' : 'flex',
            justifyContent: 'center',
          }}
        />
        <Navbar.Brand
          style={{
            flexGrow: 1,
            marginRight: 0,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {title || <>&nbsp;</>}
        </Navbar.Brand>
        {more && (
          <OverlayTrigger
            placement="bottom"
            overlay={(props) => (
              <Popover {...props}>
                <Popover.Body style={{ padding: '0' }}>{more}</Popover.Body>
              </Popover>
            )}
            trigger={['click']}
          >
            <Navbar.Brand
              style={{
                marginRight: '0',
                alignSelf: 'stretch',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '3.5rem',
              }}
            >
              <FontAwesomeIcon icon={faEllipsisH} />
            </Navbar.Brand>
          </OverlayTrigger>
        )}
      </Navbar>
      {(isLoading || isOffline) && (
        <div
          style={{
            background: '#777',
            textAlign: 'center',
            color: '#fff',
            letterSpacing: '0.05em',
          }}
        >
          {isLoading ? 'Lädt...' : 'Offline'}
        </div>
      )}
      <div
        style={{
          overflowX: 'hidden',
          overflowY: 'scroll',
          gridRow: '3',
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PageFrame;
