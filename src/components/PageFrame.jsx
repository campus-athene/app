import React from 'react';
import { useHistory } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const PageFrame = ({ children, title }) => {
  const history = useHistory();
  
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Navbar.Brand
            onClick={() => history.goBack()}
            style={{
              margin: '-0.5rem 0 -0.5rem -1rem',
              alignSelf: 'stretch',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: '1.25rem',
              paddingRight: '1.25rem'
            }}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </Navbar.Brand>
        <Navbar.Brand>{title}</Navbar.Brand>
      </Navbar>
      <Container style={{ marginTop: '3.5em', overflow: 'scroll' }}>
        { children }
      </Container>
    </div>
  );
}

export default PageFrame;
