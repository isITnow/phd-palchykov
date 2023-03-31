import { useParams } from "react-router-dom";
import Gallery from "../components/Gallery/Gallery";

const GalleryPage = () => {
  const { theme } = useParams();
  return (
    <section className="py-4">
      <h2>Gallery Page</h2>
      <Gallery theme={theme} />
    </section>
  );
};

export default GalleryPage;
