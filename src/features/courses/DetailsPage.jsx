import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import PageFrame from '../common/PageFrame';
import { selectBySemesterAndNumber } from './coursesSlice';

const DetailsPage = () => {
  const { semester, number: numberEncoded } = useParams();
  const number = decodeURIComponent(numberEncoded);
  const course = useSelector(selectBySemesterAndNumber(semester, number));
  return <PageFrame title={course.name}>{JSON.stringify(course)}</PageFrame>;
};

export default DetailsPage;
