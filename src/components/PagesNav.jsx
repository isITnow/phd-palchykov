import { Link } from "react-router-dom";

const PagesNav = ({ location, list }) => {
  const isDisabled = (name) => (location === name ? "none" : "auto");
  const getStyle = (name) =>
    location === name
      ? "mb-3 text-danger fw-bold"
      : "mb-3 text-secondary fw-bold";
  return (
    <ul className="mb-0 text-end">
      {list.map((name, indx) => (
        <li key={indx}>
          <Link
            style={{ pointerEvents: isDisabled(name) }}
            className={getStyle(name)}
            to={`/publications/${name}`}
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PagesNav;
