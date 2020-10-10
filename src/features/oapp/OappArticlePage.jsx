import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import PageFrame from '../common/PageFrame';
import articles from './articles.json';

const OappArticlePage = () => {
  const params = useParams();
  const url = `/${params.l1}/${params.l2}/${params.l3}/`;
  const a = articles[url];
  return <PageFrame title={a.title1}>
    {a.image ? <img src={'https://www.oapp.tu-darmstadt.de' + a.image} alt="" style={{ width: '100%' }} /> : null}
    <h2 style={{ userSelect: 'text' }}>{a.title2}</h2>
    {!a.section2 ?
      <div style={{ userSelect: 'text' }} dangerouslySetInnerHTML={{ __html: a.section1 }} /> :
      <Tabs defaultActiveKey="tab1">
        <Tab title={a.tab1} eventKey="tab1">
          <div style={{ userSelect: 'text' }} dangerouslySetInnerHTML={{ __html: a.section1 }} />
        </Tab>
        <Tab title={a.tab2} eventKey="tab2">
          <div style={{ userSelect: 'text' }} dangerouslySetInnerHTML={{ __html: a.section2 }} />
        </Tab>
      </Tabs>
    }
  </PageFrame>
};

export default OappArticlePage;
