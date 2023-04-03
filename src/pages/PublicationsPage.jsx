import { useParams } from "react-router-dom";
import PublicationsList from "../components/Publication/PublicationsList";

const PublicationsPage = () => {
  const { period } = useParams();
  return (
    <section className="py-4">
      <p className="mb-3 text-secondary text-end fw-bold">{period}</p>
      <PublicationsList period={period} />
    </section>
  );
};

export default PublicationsPage;
