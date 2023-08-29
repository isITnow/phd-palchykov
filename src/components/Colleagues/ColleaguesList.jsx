import Colleague from "./Colleague";

const ColleaguesList = ({ colleagues }) => {
  return (
    <ul className="row row-cols-1 row-cols-lg-2">
      {colleagues.map((colleague) => (
        <li className="col mb-3" key={colleague.id}>
          <Colleague colleague={colleague} />
        </li>
      ))}
    </ul>
  );
};

export default ColleaguesList;
