import { useParams } from "react-router-dom";

const GalleryPage = () => {
  const { theme } = useParams();
  return (
    <section className="py-4">
      <h2>GalleryPage</h2>
      <h4>{theme}</h4>
    </section>
  );
};

export default GalleryPage;
