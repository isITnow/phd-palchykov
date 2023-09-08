import GalleryByTheme from "../components/Gallery/GalleryByTheme";
import Section from "../components/shared/Section";

import setPageTitle from "../assets/utils/setPageTitle";

const GalleryByThemePage = () => {
  setPageTitle("Gallery");
  return (
    <Section>
      <GalleryByTheme />
    </Section>
  );
};

export default GalleryByThemePage;
