import Colleague from "./Colleague";
import colleaguesArray from "../../assets/data/colleagues";

const ColleaguesList = () => {
  return (
    <ul className="row row-cols-1 row-cols-lg-2">
      {colleaguesArray.map((colleague) => (
        <li className="col mb-3" key={colleague.id}>
          <Colleague colleague={colleague} />
        </li>
      ))}
    </ul>
  );
};

export default ColleaguesList;
