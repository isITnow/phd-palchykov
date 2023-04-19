import Gallery from "../components/Gallery/Gallery";

import setPageTitle from "../assets/utils/setPageTitle";

const GalleryPage = () => {
  setPageTitle("Gallery");
  return (
    <section className="py-4">
      <Gallery />
    </section>
  );
};

export default GalleryPage;
