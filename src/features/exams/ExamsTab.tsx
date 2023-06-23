import { ExamMobile, ModuleOffer } from '@campus/campusnet-sdk';
import { Fragment } from 'react';
import { useNavigate } from 'react-router';
import { UserNotLoggedInError } from '../../provider/camusnet';
import { Module } from '../../provider/camusnet/courses';
import { useExams } from '../../provider/camusnet/exams';
import CampusNetLoginTeaser from '../auth/CampusNetLoginTeaser';
import ExamDetails from './ExamDetails';

// // https://www.flaticon.com/free-icon/logout_1828433 (yes, its logout.svg for registration)
// export const Register = (props) =>
//   createElement('div', {
//     ...props,
//     dangerouslySetInnerHTML: {
//       __html: `<svg height="100%" viewBox="0 0 512 512" width="100%" xmlns="http://www.w3.org/2000/svg"><path d="m453.332031 512h-224c-32.363281 0-58.664062-26.304688-58.664062-58.667969v-96c0-8.832031 7.167969-16 16-16s16 7.167969 16 16v96c0 14.699219 11.964843 26.667969 26.664062 26.667969h224c14.699219 0 26.667969-11.96875 26.667969-26.667969v-394.664062c0-14.699219-11.96875-26.667969-26.667969-26.667969h-224c-14.699219 0-26.664062 11.96875-26.664062 26.667969v96c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-96c0-32.363281 26.300781-58.667969 58.664062-58.667969h224c32.363281 0 58.667969 26.304688 58.667969 58.667969v394.664062c0 32.363281-26.304688 58.667969-58.667969 58.667969zm0 0"/><path d="m325.332031 272h-309.332031c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h309.332031c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0"/><path d="m240 357.332031c-4.097656 0-8.191406-1.554687-11.308594-4.691406-6.25-6.25-6.25-16.382813 0-22.636719l74.027344-74.023437-74.027344-74.027344c-6.25-6.25-6.25-16.386719 0-22.636719 6.253906-6.25 16.386719-6.25 22.636719 0l85.332031 85.335938c6.25 6.25 6.25 16.382812 0 22.632812l-85.332031 85.332032c-3.136719 3.160156-7.230469 4.714843-11.328125 4.714843zm0 0"/></svg>`,
//     },
//   });
//
// // https://www.flaticon.com/free-icon/login_1828421, mirrored
// export const Unregister = (props) =>
//   createElement('div', {
//     ...props,
//     dangerouslySetInnerHTML: {
//       __html: `<svg height="100%" viewBox="0 0 512 512" width="100%" xmlns="http://www.w3.org/2000/svg"><path d="M170.7,453.3V336c0-8.8,7.2-16,16-16s16,7.2,16,16v117.3c0,14.7,12,26.7,26.7,26.7h224c14.7,0,26.7-12,26.7-26.7V58.7 C480,44,468,32,453.3,32h-224c-14.7,0-26.7,12-26.7,26.7V176c0,8.8-7.2,16-16,16s-16-7.2-16-16V58.7C170.7,26.3,197,0,229.3,0l224,0 C485.7,0,512,26.3,512,58.7v394.7c0,32.4-26.3,58.7-58.7,58.7h-224C197,512,170.7,485.7,170.7,453.3z"/><path d="M0,256c0-8.8,7.2-16,16-16h309.3c8.8,0,16,7.2,16,16c0,8.8-7.2,16-16,16H16C7.2,272,0,264.8,0,256z"/><path d="M90,352.6L4.7,267.3c-6.2-6.2-6.2-16.4,0-22.6L90,159.3c6.3-6.2,16.4-6.2,22.6,0c6.2,6.2,6.2,16.4,0,22.6l-74,74l74,74 c6.2,6.3,6.2,16.4,0,22.6c-3.1,3.1-7.2,4.7-11.3,4.7C97.3,357.3,93.2,355.8,90,352.6z"/></svg>`,
//     },
//   });

const ExamsTab = (props: { module: Module | ModuleOffer }) => {
  const navigate = useNavigate();
  const groupedExams = useExams();
  // const [selectedExam, setSelectedExam] = useState<ExamMobile | null>(null);

  if (groupedExams.error instanceof UserNotLoggedInError)
    return <CampusNetLoginTeaser title="Prüfungen" />;

  console.log(groupedExams.data);

  // Workaround. It should always be contextNumber.
  const contextNumber = (exam: ExamMobile) =>
    'contextNumber' in exam ? exam.contextNumber : (exam as any).contextCode;

  return (
    <div className="overflow-y-scroll">
      {groupedExams.data
        ?.filter(
          (e) =>
            (e.contextType === 'module' &&
              contextNumber(e) === props.module.number) ||
            props.module.courses.map((c) => c.number).includes(contextNumber(e))
        )
        .map((exam) => (
          <Fragment key={exam.examId}>
            <ExamDetails exam={exam} />
            {/* {(exam.status === 'register' || exam.status === 'unregister') && (
              <div
                style={{
                  flexShrink: 0,
                  margin: '-0.75rem -1.25rem -0.75rem 0',
                  width: '3.5rem',
                  padding: '0 1.25rem 0 0.5rem',
                  alignSelf: 'stretch',
                  display: 'grid',
                  alignContent: 'center',
                }}
                onClick={(e) => {
                  setSelectedExam(exam);
                  e.stopPropagation();
                }}
              >
                {exam.status === 'register' && (
                  <Register style={{ fill: '#28a745' }} />
                )}
                {exam.status === 'unregister' && (
                  <Unregister style={{ fill: '#dc3545' }} />
                )}
              </div>
            )} */}
          </Fragment>
        ))}
      {/* {selectedExam && (
        <ExamRegModal
          exam={selectedExam}
          closeCallback={() => setSelectedExam(null)}
        />
      )} */}
    </div>
  );
};

export default ExamsTab;
