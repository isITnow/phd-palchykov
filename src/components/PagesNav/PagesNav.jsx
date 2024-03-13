import { Link } from "react-router-dom";
import s from "./pagesNav.module.css";

const PagesNav = ({ currentPeriodId, periods, margin = "my-0" }) => {
  const isDisabled = (id) => (currentPeriodId === id ? "none" : "auto");
  const getStyle = (id) =>
    currentPeriodId === id
      ? "mb-3 text-danger fw-bold"
      : `mb-3 text-secondary fw-bold ${s.hoverEffect}`;
  return (
    <ul className={`d-flex flex-column align-items-end ${margin}`}>
      {periods.map(({ title, id }) => (
        <li key={id}>
          <Link
            style={{ pointerEvents: isDisabled(id) }}
            className={getStyle(id)}
            to={`/periods/${id}/publications`}
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PagesNav;
