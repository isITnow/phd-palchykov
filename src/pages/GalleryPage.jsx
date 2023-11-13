import Gallery from "../components/Gallery/Gallery";
import Section from "../components/shared/Section";

import setPageTitle from "../assets/utils/setPageTitle";

const GalleryPage = () => {
  return (
    <Section>
      <Gallery />
      <PhotoAlbumForm />
    </Section>
  );
};

export default GalleryPage;
