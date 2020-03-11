import React from 'react';
import PageFrame from '../components/PageFrame';
import { Image } from 'react-bootstrap';

const MapsPage = () => {
  return (
    <PageFrame title="Karten">
      <h3 style={{ marginTop: "0.5em" }}>Stadtmitte Mitte (S1)</h3>
      <Image thumbnail style={{ marginBottom: "1em" }} src="https://www.tu-darmstadt.de/media/daa_responsives_design/01_die_universitaet_medien/campus_medien_1/lageplaene_medien/karten_medien/lageplan-tu-detail_S1.png" />
      <h3>Stadtmitte Nord (S2)</h3>
      <Image thumbnail style={{ marginBottom: "1em" }} src="https://www.tu-darmstadt.de/media/daa_responsives_design/01_die_universitaet_medien/campus_medien_1/lageplaene_medien/karten_medien/lageplan-tu-detail_S2.png" />
      <h3>Stadtmitte Süd (S3)</h3>
      <Image thumbnail style={{ marginBottom: "1em" }} src="https://www.tu-darmstadt.de/media/daa_responsives_design/01_die_universitaet_medien/campus_medien_1/lageplaene_medien/karten_medien/lageplan-tu-detail_S3_870x0.png" />
      <h3>Lichtwiese (L)</h3>
      <Image thumbnail style={{ marginBottom: "1em" }} src="https://www.tu-darmstadt.de/media/daa_responsives_design/01_die_universitaet_medien/campus_medien_1/lageplaene_medien/karten_medien/lageplan-tu-detail_L_870x0.png" />
      <h3>Botanischer Garten (B)</h3>
      <Image thumbnail style={{ marginBottom: "1em" }} src="https://www.tu-darmstadt.de/media/daa_responsives_design/01_die_universitaet_medien/campus_medien_1/lageplaene_medien/karten_medien/lageplan-tu-detail_B_870x0.png" />
      <h3>Hochschulstadion (H)</h3>
      <Image thumbnail style={{ marginBottom: "1em" }} src="https://www.tu-darmstadt.de/media/daa_responsives_design/01_die_universitaet_medien/campus_medien_1/lageplaene_medien/karten_medien/lageplan-tu-overview_H_870x0.png" />
    </PageFrame>
  )
}

export default MapsPage;
