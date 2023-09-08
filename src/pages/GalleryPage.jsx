import Gallery from "../components/Gallery/Gallery";
import Section from "../components/shared/Section";

import setPageTitle from "../assets/utils/setPageTitle";

const GalleryPage = () => {
  setPageTitle("Gallery");
  return (
    <Section>
      <Gallery />
    </Section>
  );
};

export default GalleryPage;
