import { faAngleLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { setSideMenuOpen } from './commonSlice';

const NavButton = ({ as, style, type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hamburgerInUrl = useLocation().search.includes('hamburger');

  const hamburger = type === 'hamburger' || (type !== 'back' && hamburgerInUrl);
  const As = as || Button;

  return (
    <As
      onClick={() =>
        hamburger ? dispatch(setSideMenuOpen(true)) : navigate(-1)
      }
      style={{
        background: 'none',
        border: 'none',
        fontSize: '1.25rem',
        height: '3.5rem',
        width: '3.5rem',
        ...style,
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
