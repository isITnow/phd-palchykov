import GalleryByTheme from "../components/Gallery/GalleryByTheme";

import setPageTitle from "../assets/utils/setPageTitle";

const GalleryByThemePage = () => {
  setPageTitle("Gallery");
  return (
    <section className="py-4">
      <GalleryByTheme />
    </section>
  );
};

export default GalleryByThemePage;
