import { useAppDispatch } from '../../redux/hooks';
import { setOnboardingComplete } from '../settings/settingsSlice';
import { Button, Frame, Heading, Subheading } from './Controls';
import focusedPeopleStudying from './focused-people-studying-online-school.svg';

const WelcomePage = () => {
  const dispatch = useAppDispatch();
  const onClose = () => dispatch(setOnboardingComplete());

  return (
    <Frame>
      <Heading>Willkommen</Heading>
      <Subheading>
        Herzlich Willkommen bei
        <br />
        Campus und im organisierten
        <br />
        Studienalltag.
      </Subheading>
      <img
        src={focusedPeopleStudying}
        style={{ height: '8em' }}
        alt="focused people studying"
      />
      <Button onClick={onClose}>Los geht’s</Button>
    </Frame>
  );
};

export default WelcomePage;
