import React from 'react';
import PageFrame from '../components/PageFrame';
import { connect } from 'react-redux';

const CoronaPage = ({ news }) => {
  return (
    <PageFrame title="Corona-News">
      {
        news.map(({ title, date, content }) => (
          <>
            <h3>{title}</h3>
            <i>{date}</i>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </>
        ))
      }
    </PageFrame>
  );
}

export default connect(
  state => ({ news: state.corona })
)(CoronaPage);
