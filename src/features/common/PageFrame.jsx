import React from 'react';
import { useHistory } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const PageFrame = ({ children, title, noBack }) => {
  const history = useHistory();

  return (
    <div
      style={{ display: 'grid', gridTemplateRows: 'auto 1fr', height: '100vh' }}
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
        <Navbar.Brand>{title || <>&nbsp;</>}</Navbar.Brand>
      </Navbar>
      <Container style={{ overflowX: 'hidden', overflowY: 'scroll' }}>
        {children}
      </Container>
    </div>
  );
};

export default PageFrame;
