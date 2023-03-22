import { ResponsivePie } from '@nivo/pie';
import { useParams } from 'react-router-dom';
import PageFrame from '../../components/PageFrame';
import {
  useExam,
  useExamGrade as useExamGradeDistribution,
} from '../../provider/camusnet/exams';
import convertGrade from './gradeConverter';

const ExamDetailsPage = () => {
  const id = Number.parseInt(useParams<{ id: string }>().id || '0');

  // const [modalOpen, setModalOpen] = useState();

  const statsQuery = useExamGradeDistribution(id);
  const stats = statsQuery.data;
  const examQuery = useExam(id);
  const exam = examQuery.data;

  if (!exam) return null;

  return (
    <PageFrame
      title="Klausurergebnisse"
      className="p-4"
      syncState={{
        isLoading: examQuery.isLoading || statsQuery.isLoading,
        isOffline: examQuery.isError || statsQuery.isError,
      }}
    >
      <h3>{exam.contextName}</h3>
      <h4>{exam.name}</h4>
      <p>
        K&uuml;rzel: {exam.contextNumber}
        <br />
        Datum: {exam.dueDate}
        <br />
        {exam.grade && (
          <span>
            Bewertung: {convertGrade(exam.grade).desc} ({exam.grade})
          </span>
        )}
      </p>
      {stats && (
        <div className="aspect-square">
          <ResponsivePie
            // height={250}
            data={stats.gradeDist.map(([grade, value]) => ({
              id: grade,
              label: grade,
              value,
              color: convertGrade(grade).hexColor,
            }))}
            margin={{ top: 20, right: 60, bottom: 20, left: 60 }}
            innerRadius={0.6}
            activeOuterRadiusOffset={8}
            colors={{ datum: 'data.color' }}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsThickness={2}
            arcLinkLabelsDiagonalLength={8}
            arcLinkLabelsStraightLength={12}
            arcLinkLabelsColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            isInteractive={false}
          />
        </div>
      )}
      {/* {exam.status === 'register' && (
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
      ) : null} */}
    </PageFrame>
  );
};

export default ExamDetailsPage;
