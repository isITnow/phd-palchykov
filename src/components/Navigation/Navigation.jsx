import { NavLink, Link, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectPeriods } from "../../redux/publicationPeriods/selectorPublicationPeriods";

import s from "./navigation.module.css";

const setNavLinkClass = ({ isActive }) =>
  `${s.nav_item} nav-link fw-bold ${isActive && "text-primary"}`;

const Navigation = () => {
  const { periods } = useSelector(selectPeriods);
  const { pathname } = useLocation();
  const publicationsSpanClass = pathname.includes("publications")
    ? "text-primary"
    : "";

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid px-0">
        <Link className="navbar-brand fw-bold" to={"/"}>
          <span>Prof. Dr. </span>
          <span className="text-primary fs-5">Vitalii Palchykov</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse flex-grow-0"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={setNavLinkClass} aria-current="page" to={"/"}>
                <span>Home</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={setNavLinkClass} to={"researches"}>
                <span>Research</span>
              </NavLink>
            </li>
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
                    <Link
                      className="dropdown-item"
                      to={`periods/${id}/publications`}
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item">
              <NavLink className={setNavLinkClass} to={"gallery"}>
                <span>Gallery</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={setNavLinkClass} to={"/news"}>
                <span>News</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={setNavLinkClass} to={"colleagues"}>
                <span>Colleagues</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={setNavLinkClass} to={"posts"}>
                <span>Blog</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={setNavLinkClass} to={"contacts"}>
                <span>Contacts</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
