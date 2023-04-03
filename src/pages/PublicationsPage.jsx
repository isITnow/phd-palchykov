import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import publicationsArray from "../assets/data/publications";
import PublicationsList from "../components/Publications/PublicationsList";

const PublicationsPage = () => {
  const { period } = useParams();
  const [list, setList] = useState([]);

  useEffect(() => {
    const data = publicationsArray.find(
      (publication) => publication.period === period
    ).publicationsList;
    setList(data);
  }, [period]);

  return (
    <section className="py-4">
      <p className="mb-3 text-secondary text-end fw-bold">{period}</p>
      <PublicationsList publications={list} />
    </section>
  );
};

export default PublicationsPage;
