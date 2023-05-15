import { useAppDispatch } from '../../redux/hooks';
import { setOnboardingComplete } from '../settings/settingsSlice';
import { Frame } from './Controls';
import focusedPeopleStudying from './focused-people-studying-online-school.svg';

const WelcomePage = () => {
  const dispatch = useAppDispatch();
  const onClose = () => dispatch(setOnboardingComplete());

  return (
    <Frame title="Willkommen" priAction="Los geht’s" onPriAction={onClose}>
      <p>
        Herzlich Willkommen bei
        <br />
        Campus und im organisierten
        <br />
        Studienalltag.
      </p>
      <img
        src={focusedPeopleStudying}
        style={{ height: '8em' }}
        alt="focused people studying"
      />
    </Frame>
  );
};

export default WelcomePage;
