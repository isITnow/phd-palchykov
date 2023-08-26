import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PagesNav from "../components/PagesNav/PagesNav";
import PublicationsList from "../components/Publications/PublicationsList";

import { publicationsAPI } from "../services/publicationsAPI";
import { useOutletContext } from "react-router-dom";

import setPageTitle from "../assets/utils/setPageTitle";

const PublicationsPage = () => {
  setPageTitle("Publications");
  const { id } = useParams();
  console.log("id: ", id);
  const periods = useOutletContext();
  console.log("periods: ", periods);
  const [publicationsList, setPublicationsList] = useState([]);

  const currentPeriod = periods.find((period) => period.id === id);
  console.log("currentPeriod: ", currentPeriod);
  // const periodsList = publicationsArray.map(
  //   (publication) => publication.period
  // );

  useEffect(() => {
    (async () => {
      try {
        const { data } = await publicationsAPI.fetchPublications(id);
        console.log("data: ", data);
        // setPeriods(data);
      } catch (error) {
        console.log("Periods error", error);
      }
    })();
  }, [id]);

  // useEffect(() => {
  //   const data = publicationsArray.find(
  //     (publication) => publication.period === period
  //   ).publicationsList;
  //   setList(data);
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }, [period]);

  return (
    <section className="py-4">
      {/* <p className="mb-3 text-secondary text-end fw-bold">{}</p> */}
      {/* <PagesNav margin={"mb-3"} list={periodsList} location={period} /> */}
      <PublicationsList publications={publicationsList} />
      {/* <PagesNav margin={"mt-3 mb-0"} list={periodsList} location={period} /> */}
    </section>
  );
};

export default PublicationsPage;
