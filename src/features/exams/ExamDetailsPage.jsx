import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { log } from '../../errorReporting';
import PageFrame from '../common/PageFrame';
import ExamRegModal from './ExamRegModal';
import { getExamDetails, selectExam, selectExamSyncState } from './examsSlice';
import convertGrade from './gradeConverter';

const ExamDetailsPage = () => {
  const { id } = useParams(); // This will return a string
  const dispatch = useDispatch();
  const history = useHistory();
  const exam = useSelector(selectExam(id));
  const syncState = useSelector(selectExamSyncState(id));
  const [modalOpen, setModalOpen] = useState();

  useEffect(() => {
    dispatch(getExamDetails(exam?.id));
  }, [dispatch, exam?.id]);

  useEffect(() => {
    if (!exam) {
      log('warning', 'ExamDetailsPage received invalid id parameter.', { id });
      history.goBack();
    }
  }, [exam, history, id]);
  if (!exam) return null;

  return (
    <PageFrame title="Klausurdetails" syncState={syncState}>
      <h3 style={{ marginTop: '1rem' }}>{exam.courseName}</h3>
      <h4>{exam.examName}</h4>
      <p>
        K&uuml;rzel: {exam.code}
        <br />
        Datum: {exam.date}
        <br />
        {exam.grade && (
          <span>
            Bewertung: {convertGrade(exam.grade).desc} ({exam.grade})
          </span>
        )}
      </p>
      {exam.gradeDist && (
        <Table bordered>
          <thead>
            <tr>
              <td>Note</td>
              <td>Anzahl</td>
            </tr>
          </thead>
          <tbody>
            {exam.gradeDist.map(([name, value]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {exam.status === 'register' && (
        <Button variant="outline-success" onClick={() => setModalOpen(true)}>
          Anmelden
        </Button>
      )}
      {exam.status === 'unregister' && (
        <Button variant="outline-danger" onClick={() => setModalOpen(true)}>
          Abmelden
        </Button>
      )}
      {modalOpen ? (
        <ExamRegModal exam={exam} closeCallback={() => setModalOpen(false)} />
      ) : null}
    </PageFrame>
  );
};

export default ExamDetailsPage;
