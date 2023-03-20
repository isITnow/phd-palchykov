import { useParams } from "react-router-dom";
import PublicationsList from "../components/PublicationsList/PublicationsList";

const PublicationsPage = () => {
  const { period } = useParams();
  return (
    <section className="py-4">
      <h2>Publications {period}</h2>
      <PublicationsList />
    </section>
  );
};

export default PublicationsPage;
