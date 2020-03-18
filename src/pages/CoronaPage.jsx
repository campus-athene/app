import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import PageFrame from '../components/PageFrame';

const CoronaPage = ({ loading, html, error }) => {
  return (
    <PageFrame title="Corona-News">
      {
        !loading && html ?
          <div className="row" style={{ height: '100%' }}>
            <iframe srcDoc={html} title="Corona-News" style={{ border: 'none', width: '100%', height: '100%' }} />
          </div> :
          <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            {
              error ?
                <>Offline</> :
                <Spinner animation="grow" variant="dark" />
            }
          </div>
      }
    </PageFrame>
  );
}

export default connect(
  state => state.corona
)(CoronaPage);
