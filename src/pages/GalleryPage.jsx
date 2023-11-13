import Gallery from "../components/Gallery/Gallery";
import Section from "../components/shared/Section";
import PhotoAlbumForm from "../components/Gallery/PhotoAlbumForm";

const GalleryPage = () => {
  return (
    <Section>
      <Gallery />
      <PhotoAlbumForm />
    </Section>
  );
};

export default GalleryPage;
