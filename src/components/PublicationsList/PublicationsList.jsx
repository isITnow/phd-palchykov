import Publication from "../Publication/Publication";
import s from "./publicationsList.module.css";

const PublicationsList = () => {
  return (
    <>
      <ul className="row row-cols-1 row-cols-md-2 g-2">
        <li className={`col ${s.hoverEffect}`}>
          <Publication />
        </li>
        <li className="col">
          <Publication />
        </li>
        <li className="col">
          <Publication />
        </li>
        <li className="col">
          <Publication />
        </li>
      </ul>
    </>
  );
};

export default PublicationsList;
