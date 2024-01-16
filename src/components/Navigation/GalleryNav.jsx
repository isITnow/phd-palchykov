import { NavLink } from "react-router-dom";

const GalleryNav = ({ setNavLinkClass }) => {
  return (
    <li className="nav-item">
      <NavLink className={setNavLinkClass} to={"gallery"}>
        <span>Gallery</span>
      </NavLink>
    </li>
  );
};

export default GalleryNav;
