import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import PageFrame from '../../components/PageFrame';
import CampusNetLoginModal from './CampusNetLoginModal';

const CampusNetLoginTeaser = (props: { title: string }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setDialogOpen(true), 400);
  }, [setDialogOpen]);

  return (
    <PageFrame
      title={props.title}
      className="grid items-center justify-items-center"
    >
      <div className="w-[70%] text-center">
        <p className="mb-4">
          Verbinde Campus mit TUCaN um diesen Inhalt anzeigen zu können.
        </p>
        <Button onClick={() => setDialogOpen(true)}>Verbinden</Button>
      </div>
      <CampusNetLoginModal
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onOpen={() => setDialogOpen(true)}
      />
    </PageFrame>
  );
};

export default CampusNetLoginTeaser;
