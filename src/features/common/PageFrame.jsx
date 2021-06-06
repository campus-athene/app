import React from 'react';
import { useHistory } from 'react-router-dom';
import { Navbar, Container, OverlayTrigger } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const PageFrame = ({
  children,
  title,
  noBack,
  more,
  syncState: { isLoading, isOffline } = { isLoading: false, isOffline: false },
}) => {
  const history = useHistory();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto auto 1fr',
        height: '100vh',
      }}
    >
      <Navbar
        bg="dark"
        variant="dark"
        style={{ paddingTop: 'calc(0.5rem + env(safe-area-inset-top))' }}
      >
        <Navbar.Brand
          onClick={() => history.goBack()}
          style={{
            margin: '-0.5rem 0 -0.5rem -1rem',
            alignSelf: 'stretch',
            display: noBack ? 'none' : 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: '1.25rem',
            paddingRight: '1.25rem',
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </Navbar.Brand>
        <Navbar.Brand
          style={{
            flexGrow: 1,
          }}
        >
          {title || <>&nbsp;</>}
        </Navbar.Brand>
        {more && (
          <Navbar.Brand
            style={{
              marginRight: 0,
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
      <Container
        style={{ overflowX: 'hidden', overflowY: 'scroll', gridRow: '3' }}
      >
        {children}
      </Container>
    </div>
  );
};

export default PageFrame;
