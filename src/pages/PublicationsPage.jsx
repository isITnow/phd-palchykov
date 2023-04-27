import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PagesNav from "../components/PagesNav/PagesNav";
import PublicationsList from "../components/Publications/PublicationsList";
import publicationsArray from "../assets/data/publications";

import setPageTitle from "../assets/utils/setPageTitle";

const PublicationsPage = () => {
  setPageTitle("Publications");
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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [period]);

  return (
    <section className="py-4">
      {/* <p className="mb-3 text-secondary text-end fw-bold">{period}</p> */}
      <PagesNav margin={"mb-3"} list={periodsList} location={period} />
      <PublicationsList publications={list} />
      <PagesNav margin={"mt-3 mb-0"} list={periodsList} location={period} />
    </section>
  );
};

export default PublicationsPage;
