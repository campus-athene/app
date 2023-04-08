import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectStatusBarHeightCss } from '../redux/globalSlice';
import ContextMenu from './ContextMenu';
import NavButton from './NavButton';

const PageFrame = (props: {
  className?: string;
  children?: React.ReactNode;
  title?: string;
  style?: React.CSSProperties;
  noMenu?: boolean;
  more?: React.ReactNode;
  moreIcon?: IconProp;
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
        className="flex items-center text-white"
        style={{
          backgroundColor: '#372649',
          height: 'calc(3.5rem + env(safe-area-inset-top))',
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
            <FontAwesomeIcon icon={props.moreIcon || faEllipsisH} />
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
      {props.more && (
        <ContextMenu
          anchor="top"
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          PaperProps={{
            style: { marginTop: 'calc(4rem + env(safe-area-inset-top))' },
          }}
        >
          {props.more}
        </ContextMenu>
      )}
    </div>
  );
};

export default PageFrame;
