import Gallery from "../components/Gallery/Gallery";
import Section from "../components/shared/Section";

import setPageTitle from "../assets/utils/setPageTitle";
import PhotoAlbumForm from "../components/Gallery/PhotoAlbumForm";

const GalleryPage = () => {
  setPageTitle("Gallery");
  return (
    <Section>
      <Gallery />
      <PhotoAlbumForm />
    </Section>
  );
};

export default GalleryPage;
