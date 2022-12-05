import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectStatusBarHeightCss } from '../redux/globalSlice';
import NavButton from './NavButton';

const PageFrame = (props: {
  className?: string;
  children?: React.ReactNode;
  title?: string;
  style?: React.CSSProperties;
  noMenu?: boolean;
  more?: React.ReactNode;
  syncState?: { isLoading: boolean; isOffline: boolean };
}) => {
  const statusBarHeightCss = useSelector(selectStatusBarHeightCss());
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto auto 1fr',
        height: '100vh',
      }}
    >
      <nav
        className="flex h-14 items-center text-white"
        style={{
          backgroundColor: '#372649',
          paddingTop: statusBarHeightCss,
          width: '100vw',
        }}
      >
        <NavButton
          style={{
            alignItems: 'center',
            alignSelf: 'stretch',
            display: props.noMenu ? 'none' : 'flex',
            justifyContent: 'center',
          }}
        />
        <div
          className="text-lg"
          style={{
            flexGrow: 1,
            marginRight: 0,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {props.title || <>&nbsp;</>}
        </div>
        {props.more && (
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              marginRight: '0',
              alignSelf: 'stretch',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '3.5rem',
            }}
          >
            <FontAwesomeIcon icon={faEllipsisH} />
          </div>
        )}
      </nav>
      {(props.syncState?.isLoading || props.syncState?.isOffline) && (
        <div
          style={{
            background: '#777',
            textAlign: 'center',
            color: '#fff',
            letterSpacing: '0.05em',
          }}
        >
          {props.syncState?.isLoading ? 'Lädt...' : 'Offline'}
        </div>
      )}
      <div
        className={props.className}
        style={{
          overflowX: 'hidden',
          overflowY: 'scroll',
          gridRow: '3',
          ...props.style,
        }}
      >
        {props.children}
      </div>
      {props.more && menuOpen && (
        <div
          className="absolute inset-0 bg-black bg-opacity-70"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(false);
          }}
          style={{ paddingTop: `calc(${statusBarHeightCss} + 3.5rem)` }}
        >
          <div className="divide-y bg-white ">{props.more}</div>
        </div>
      )}
    </div>
  );
};

export default PageFrame;
