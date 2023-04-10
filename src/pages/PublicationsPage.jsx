import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PagesNav from "../components/PagesNav/PagesNav";
import PublicationsList from "../components/Publications/PublicationsList";
import publicationsArray from "../assets/data/publications";

const PublicationsPage = () => {
  const { period } = useParams();
  const [list, setList] = useState([]);
  const periodsList = publicationsArray.map(
    (publication) => publication.period
  );

  useEffect(() => {
    const data = publicationsArray.find(
      (publication) => publication.period === period
    ).publicationsList;
    setList(data);
    window.scrollTo(0, 0);
  }, [period]);

  return (
    <section className="py-4">
      <p className="mb-3 text-secondary text-end fw-bold">{period}</p>
      <PublicationsList publications={list} />
      <PagesNav list={periodsList} location={period} />
    </section>
  );
};

export default PublicationsPage;
