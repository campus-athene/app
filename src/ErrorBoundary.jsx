import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { log } from './errorReporting';
import { logout } from './features/auth/authSlice';
import PageFrame from './features/common/PageFrame';
import { Inspection } from './icons';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    log('error', 'ErrorBoundary caught an error.', { error, errorInfo });
  }

  render() {
    const { logout, navigate } = this.props;

    const toMessage = (error) => {
      if (typeof error?.toString !== 'function')
        return 'Keine Informationen verfügbar.';

      if (!(error instanceof Error)) return error.toString();

      const appendix = error.stack ? '\n\n' + error.stack : '';

      return error.toString() + appendix;
    };

    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <PageFrame noMenu>
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
              style={{ margin: '0.25rem 0 1.25rem' }}
              variant="outline-secondary"
              onClick={() => alert(toMessage(this.state.error))}
            >
              Technische Details anzeigen
            </Button>
            <Button
              style={{ margin: '0.25rem 0' }}
              variant="primary"
              onClick={() => navigate(-1)}
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

const ErrorBoundaryWrapper = ({ children }) => {
  const navigate = useNavigate();

  return React.createElement(connect(null, { logout })(ErrorBoundary), {
    children,
    key: useLocation().pathname,
    navigate,
  });
};

export default ErrorBoundaryWrapper;
