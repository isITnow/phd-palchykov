import NameNav from "./NameNav";
import NavItem from "./NavItem";
import PublicationsDropdownNav from "./PublicationsDropdownNav";

import navTabs from "../../assets/navTabs";
import s from "./navigation.module.css";

const setNavLinkClass = ({ isActive }) =>
  `${s.nav_item} nav-link fw-bold ${isActive && "text-primary"}`;
const navItems = Object.values(navTabs).sort((a, b) => a.id - b.id);

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid px-0">
        <NameNav />
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
            {navItems.map(({ id, path, title }) => {
              return title === "Publications" ? (
                <PublicationsDropdownNav
                  key={id}
                  menuTitle={title}
                  path={path}
                />
              ) : (
                <NavItem
                  key={id}
                  menuTitle={title}
                  path={path}
                  setNavLinkClass={setNavLinkClass}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
