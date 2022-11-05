import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar, OverlayTrigger, Popover } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectStatusBarHeightCss } from './commonSlice';
import NavButton from './NavButton';

const PageFrame = (props: {
  children?: React.ReactNode;
  title?: string;
  style?: React.CSSProperties;
  noMenu?: boolean;
  more?: React.ReactNode;
  syncState?: { isLoading: boolean; isOffline: boolean };
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
            display: props.noMenu ? 'none' : 'flex',
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
          {props.title || <>&nbsp;</>}
        </Navbar.Brand>
        {props.more && (
          <OverlayTrigger
            placement="bottom"
            overlay={(overlayProps) => (
              <Popover {...overlayProps}>
                <Popover.Body style={{ padding: '0' }}>
                  {props.more}
                </Popover.Body>
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
      {(props.syncState?.isLoading || props.syncState?.isOffline) && (
        <div
          style={{
            background: '#777',
            textAlign: 'center',
            color: '#fff',
            letterSpacing: '0.05em',
          }}
        >
          {props.syncState?.isLoading ? 'Lädt...' : 'Offline'}
        </div>
      )}
      <div
        style={{
          overflowX: 'hidden',
          overflowY: 'scroll',
          gridRow: '3',
          ...props.style,
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default PageFrame;
