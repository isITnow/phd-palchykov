import { Link, NavLink, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectPeriods } from "../../redux/publicationPeriods/selectorPublicationPeriods";
import s from "./navigation.module.css";

const PublicationsDropdownNav = () => {
  const { periods } = useSelector(selectPeriods);
  const { pathname } = useLocation();
  const publicationsSpanClass = pathname.includes("publications")
    ? "text-primary"
    : "";

  return (
    <li className="nav-item dropdown">
      <NavLink
        className={`${s.nav_item} nav-link dropdown-toggle fw-bold`}
        href="/#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span className={publicationsSpanClass}>Publications</span>
      </NavLink>
      <ul className="dropdown-menu text-center overflow-hidden">
        {periods.map(({ title, id }, index) => (
          <li key={index}>
            <Link className="dropdown-item" to={`periods/${id}/publications`}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default PublicationsDropdownNav;
