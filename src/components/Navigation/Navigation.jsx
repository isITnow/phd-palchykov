import BlogNav from "./BlogNav";
import ColleaguesNav from "./ColleaguesNav";
import ContactsNav from "./ContactsNav";
import GalleryNav from "./GalleryNav";
import HomeNav from "./HomeNav";
import NameNav from "./NameNav";
import NewsNav from "./NewsNav";
import PublicationsDropdownNav from "./PublicationsDropdownNav";
import ResearchNav from "./ResearchNav";

import s from "./navigation.module.css";

const setNavLinkClass = ({ isActive }) =>
  `${s.nav_item} nav-link fw-bold ${isActive && "text-primary"}`;

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
            <HomeNav setNavLinkClass={setNavLinkClass} />
            <ResearchNav setNavLinkClass={setNavLinkClass} />
            <PublicationsDropdownNav />
            <GalleryNav setNavLinkClass={setNavLinkClass} />
            <NewsNav setNavLinkClass={setNavLinkClass} />
            <ColleaguesNav setNavLinkClass={setNavLinkClass} />
            <BlogNav setNavLinkClass={setNavLinkClass} />
            <ContactsNav setNavLinkClass={setNavLinkClass} />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
