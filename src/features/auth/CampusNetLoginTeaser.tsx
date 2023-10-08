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
    <PageFrame title={props.title}>
      <div className="grid h-full items-center justify-items-center">
        <div className="w-[70%] text-center">
          <p className="mb-4">
            Verbinde Campus mit TUCaN, um
            <br />
            diesen Inhalt anzuzeigen.
          </p>
          <Button onClick={() => setDialogOpen(true)}>Verbinden</Button>
        </div>
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
