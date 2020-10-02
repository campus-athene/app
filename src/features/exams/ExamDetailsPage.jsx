import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import PageFrame from '../common/PageFrame';
import convertGrade from './gradeConverter';
import ExamRegModal from './ExamRegModal';

const ExamDetailsPage = ({ exams }) => {
  const id = Number.parseInt(useParams().id);
  const history = useHistory();
  const exam = exams.find(e => e.id === id);
  const [modalOpen, setModalOpen] = useState();

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
        {exam.grade && <span>Bewertung: {convertGrade(exam.grade).desc} ({exam.grade})</span>}
      </p>
      {exam.status === 'register' &&
        <Button variant="outline-success" onClick={() => setModalOpen(true)}>
          Anmelden
        </Button>
      }
      {exam.status === 'unregister' &&
        <Button variant="outline-danger" onClick={() => setModalOpen(true)}>
          Abmelden
        </Button>
      }
      {modalOpen ?
        <ExamRegModal exam={exam} closeCallback={() => setModalOpen(false)} /> :
        null}
    </PageFrame>
  );
};

export default connect(
  state => ({
    exams: state.exams
  })
)(ExamDetailsPage);
