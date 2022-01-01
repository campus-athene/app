import { useSelector } from 'react-redux';
import { Navbar, OverlayTrigger } from 'react-bootstrap';
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
        ...style,
      }}
    >
      <Navbar
        bg="dark"
        variant="dark"
        style={{
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
            <OverlayTrigger placement="bottom" overlay={more}>
              <FontAwesomeIcon icon={faEllipsisH} />
            </OverlayTrigger>
          </Navbar.Brand>
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
      <div style={{ overflowX: 'hidden', overflowY: 'scroll', gridRow: '3' }}>
        {children}
      </div>
    </div>
  );
};

export default PageFrame;
