import React from 'react';
import { connect } from 'react-redux';
import { useLocation, withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { logout } from './features/auth/state';
import PageFrame from './features/common/PageFrame';
import { Inspection } from './icons';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    const { history, logout } = this.props;
    // const history = useHistory();

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <PageFrame noBack>
          <Inspection
            style={{ height: '10rem', marginTop: '6rem', marginBottom: '1rem' }}
          />
          <p
            style={{
              textAlign: 'center',
              fontSize: '1.2rem',
              marginBottom: '3rem',
            }}
          >
            Ups, hier ist wohl
            <br />
            was schief gegangen!
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button
              style={{ margin: '0.25rem 0' }}
              variant="primary"
              onClick={() => history.goBack()}
            >
              Zurück
            </Button>
            <Button
              style={{ margin: '0.25rem 0' }}
              variant="outline-secondary"
              onClick={() => window.history.go(window.history.length * -1 + 1)}
            >
              Startseite
            </Button>
            <Button
              style={{ margin: '0.25rem 0' }}
              variant="outline-danger"
              onClick={() => {
                logout();
                window.history.go(window.history.length * -1 + 1);
              }}
            >
              App zurücksetzen
            </Button>
          </div>
        </PageFrame>
      );
    }

    return this.props.children;
  }
}

export default ({ children }) =>
  React.createElement(connect(null, { logout })(withRouter(ErrorBoundary)), {
    key: useLocation().pathname,
    children,
  });
