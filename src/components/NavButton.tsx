import { faAngleLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { setSideMenuOpen } from '../features/sideMenu/sideMenuSlice';

const NavButton = (props: {
  as?: React.ElementType;
  style?: React.CSSProperties;
  type?: 'hamburger' | 'back';
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const hamburgerInUrl = useLocation().search.includes('hamburger');

  const hamburger =
    props.type === 'hamburger' || (props.type !== 'back' && hamburgerInUrl);
  const As = props.as || 'button';

  return (
    <As
      onClick={() =>
        hamburger ? dispatch(setSideMenuOpen(true)) : history.go(-1)
      }
      style={{
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: '1.25rem',
        height: '3.5rem',
        width: '3.5rem',
        ...props.style,
      }}
    >
      {hamburger ? (
        <FontAwesomeIcon icon={faBars} />
      ) : (
        <FontAwesomeIcon icon={faAngleLeft} />
      )}
    </As>
  );
};

export default NavButton;
