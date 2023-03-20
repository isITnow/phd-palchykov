import { NavLink, Link } from "react-router-dom";
import s from "./navigation.module.css";
import publicationsArray from "../../assets/data/publications";

const setActive = ({ isActive }) =>
  isActive
    ? `${s.nav_item} nav-link text-primary fw-bold`
    : `${s.nav_item} nav-link fw-bold`;

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to={"/"}>
          <span>Ph.D. </span>
          <span className="text-primary">Palchykov</span>
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
              <NavLink className={setActive} aria-current="page" to={"/"}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={setActive} to={"research"}>
                Research
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
                Publications
              </NavLink>
              <ul className="dropdown-menu">
                {publicationsArray.map((item, idx) => (
                  <li key={idx + 1}>
                    <Link
                      className="dropdown-item"
                      to={`publications/${item.period}`}
                    >
                      {`period ${item.period}`}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item">
              <NavLink className={setActive} to={"gallery"}>
                Gallery
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={setActive} to={"contacts"}>
                Contacts
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
