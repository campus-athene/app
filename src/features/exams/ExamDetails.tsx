import {
  descriptions as semesterDescs,
  ExamMobile,
} from '@campus/campusnet-sdk';
import { ResponsivePie } from '@nivo/pie';
import { useExamGrade as useExamGradeDistribution } from '../../provider/camusnet/exams';
import convertGrade from './gradeConverter';

const ExamDetails = (props: { exam: ExamMobile }) => {
  const statsQuery = useExamGradeDistribution(props.exam.examId);
  const stats = statsQuery.data;
  const exam = props.exam;

  return (
    <div className="overflow-hidden p-4">
      <div className="truncate text-xl">{exam.contextName}</div>
      <div className="truncate">{exam.name}</div>
      <div>K&uuml;rzel: {exam.contextNumber}</div>
      <div>Semester: {semesterDescs[exam.semester]}</div>
      <div>Datum: {exam.dueDate || 'Keine Angabe'}</div>
      {exam.grade && (
        <div>
          <span>
            Bewertung:{' '}
            <div
              style={{
                backgroundColor: convertGrade(exam.grade).hexColor,
              }}
              className="inline-block rounded-full px-2 text-sm font-bold"
            >
              {convertGrade(exam.grade).desc} ({exam.grade})
            </div>
          </span>
        </div>
      )}
      {stats && <div>Durchschnitt: {stats.average}</div>}
      {stats && (
        <div className="aspect-square">
          <ResponsivePie
            // height={250}
            data={stats.gradeDist
              .filter(([_, value]) => value)
              .map(([grade, value]) => ({
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
    </div>
  );
};

export default ExamDetails;
