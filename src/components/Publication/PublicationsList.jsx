import Publication from "./Publication";
import publicationsArray from "../../assets/data/publications";
import { useEffect, useState } from "react";

const PublicationsList = ({ period }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const data = publicationsArray.find(
      (publication) => publication.period === period
    ).publicationsList;
    setList(data);
  }, [period]);

  return (
    <ul className="row row-cols-1 row-cols-md-2 g-2">
      {list.map((publication) => (
        <li key={publication.id} className="col">
          <Publication publication={publication} />
        </li>
      ))}
    </ul>
  );
};

export default PublicationsList;
