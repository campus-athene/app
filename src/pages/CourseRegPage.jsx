import React from 'react';
import { Navbar, ListGroup, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const CourseRegPage = ({ lists }) => {
  const history = useHistory();
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Navbar bg="dark" variant="dark" fixed="top">
      <Navbar.Brand onClick={() => history.goBack()} style={{ margin: '-0.5rem 0 -0.5rem -1rem', alignSelf: 'stretch', display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </Navbar.Brand>
        <Navbar.Brand>Anmeldung</Navbar.Brand>
      </Navbar>
      <Container style={{ marginTop: '3.5em', overflow: 'scroll' }}>
        { lists.map(({ id, title, modules, courses }) =>
          <ListGroup key={id} style={{ marginBottom: '1rem', marginLeft: '-15px', marginRight: '-15px' }} variant="flush">
            <ListGroup.Item className="bg-light">
              <b>{ title }</b>
            </ListGroup.Item>
            <ListGroup.Item className="bg-light">
              Module
            </ListGroup.Item>
            { modules.map(({ id, title, lecturer, registrationArgs }) =>
              <ListGroup.Item
                  key={id}>
                <h5>{title}</h5>
                <h6>{lecturer}</h6>
                { registrationArgs &&
                  <Button>Anmelden</Button>
                }
              </ListGroup.Item>
            )}
            <ListGroup.Item className="bg-light">
              Veranstaltungen
            </ListGroup.Item>
            { courses.map(({ id, title, lecturer, registrationArgs }) =>
              <ListGroup.Item
                  key={id}>
                <h5>{title}</h5>
                <h6>{lecturer}</h6>
                { registrationArgs &&
                  <Button>Anmelden</Button>
                }
              </ListGroup.Item>
            )}
          </ListGroup>
        )}
      </Container>
    </div>
  );
};

export default connect(
  state => ({ lists: state.courseOffers })
)(CourseRegPage);
