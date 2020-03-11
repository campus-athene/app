import React from 'react';
import { Link } from 'react-router-dom';
import PageFrame from '../components/PageFrame';

const HomePage = () => {
  return (
    <PageFrame title="Campus">
      <h4><Link to="classreg">Veranstaltungsanmeldung</Link></h4>
      <h4><Link to="exams">Klausurergebnisse</Link></h4>
      <h4><Link to="maps">Campuskarten</Link></h4>
    </PageFrame>
  );
};

export default HomePage;
