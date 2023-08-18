import { useState } from 'react';
import { TucanLogo } from '../../components/Logo';
import CampusNetLoginModal from '../auth/CampusNetLoginModal';
import { Frame } from './Controls';

const CampusNetLoginPage = (props: { onCompleted: () => void }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Frame
      priAction="Verbinden"
      secAction="Später verbinden"
      onPriAction={() => setModalOpen(true)}
      onSecAction={props.onCompleted}
    >
      <TucanLogo className="h-12" />
      <p className="mx-auto w-64 text-center text-chalk">
        Verbinde Campus mit TUCaN um direkt in Campus auf Deine Kurse zugreifen
        zu können und Veranstaltungen in Deinem Kalender angezeigt zu bekommen.
      </p>
      <CampusNetLoginModal
        open={modalOpen}
        onOpen={() => setModalOpen(true)}
        onClose={() => setModalOpen(false)}
        onCompleted={() => {
          setModalOpen(false);
          props.onCompleted();
        }}
      />
    </Frame>
  );
};

export default CampusNetLoginPage;
