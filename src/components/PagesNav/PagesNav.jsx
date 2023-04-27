import { Link } from "react-router-dom";
import s from "./pagesNav.module.css";

const PagesNav = ({ location, list, margin = "my-0" }) => {
  const isDisabled = (name) => (location === name ? "none" : "auto");
  const getStyle = (name) =>
    location === name
      ? "mb-3 text-danger fw-bold"
      : `mb-3 text-secondary fw-bold ${s.hoverEffect}`;
  return (
    <ul className={`text-end ${margin}`}>
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
