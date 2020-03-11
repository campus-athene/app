import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PageFrame from '../components/PageFrame';

const LoginPage = ({ exams }) => {
  const { id } = useParams();
  const history = useHistory();
  const exam = exams.find(e => e.id === id);

  if (!exam) {
    console.warn(`The requested exam '${id}' does not exist.`);
    history.goBack();
    return null;
  }
  
  return (
    <PageFrame title="Klausurdetails">
      <h3 style={{ marginTop: '1rem' }}>{exam.courseName}</h3>
      <h4>{exam.examName}</h4>
      <p>
        K&uuml;rzel: {exam.code}<br />
        Datum: {exam.date}<br />
        { exam.grade && <span>Bewertung: {exam.gradeDesc} ({exam.grade})</span> }
      </p>
    </PageFrame>
  );
};

export default connect(
  state => ({
    exams: state.exams
  })
)(LoginPage);
