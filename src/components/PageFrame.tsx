import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectStatusBarHeightCss } from '../redux/globalSlice';
import ContextMenu from './ContextMenu';

const PageFrame = (props: {
  className?: string;
  children?: React.ReactNode;
  title?: string;
  style?: React.CSSProperties;
  /** @deprecated */
  noMenu?: boolean;
  more?: React.ReactNode;
  onMore?: React.MouseEventHandler<HTMLElement>;
  moreIcon?: IconProp;
  pageProps?: React.ComponentProps<typeof IonPage>;
  headerProps?: React.ComponentProps<typeof IonHeader>;
  contentProps?: React.ComponentProps<typeof IonContent>;
  extensionToolbarProps?: React.ComponentProps<typeof IonToolbar>;
  toolbarButtons?: React.ReactNode[];
  toolbarExtension?: React.ReactNode;
  syncState?: { isLoading: boolean; isOffline: boolean };
}) => {
  const statusBarHeightCss = useSelector(selectStatusBarHeightCss());
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <IonPage {...props.pageProps}>
      <IonHeader translucent collapse="fade" {...props.headerProps}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{props.title}</IonTitle>
          {(props.more || props.onMore) && (
            <IonButtons slot="end">
              <IonButton
                onClick={props.onMore || (() => setMenuOpen(!menuOpen))}
              >
                <FontAwesomeIcon icon={props.moreIcon || faEllipsisH} />
              </IonButton>
            </IonButtons>
          )}
          {props.toolbarButtons && <>{...props.toolbarButtons}</>}
        </IonToolbar>
        {props.toolbarExtension ? (
          <IonToolbar {...props.extensionToolbarProps}>
            {props.toolbarExtension}
          </IonToolbar>
        ) : null}
      </IonHeader>
      <IonContent
        className={props.className}
        style={props.style}
        {...props.contentProps}
      >
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
        {props.children}
        {props.more && (
          <ContextMenu
            anchor="top"
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            PaperProps={{
              style: { marginTop: `calc(4rem + ${statusBarHeightCss})` },
            }}
          >
            {props.more}
          </ContextMenu>
        )}
      </IonContent>
    </IonPage>
  );
};

export default PageFrame;
