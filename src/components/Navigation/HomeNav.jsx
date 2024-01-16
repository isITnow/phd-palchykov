import { NavLink } from "react-router-dom";

const HomeNav = ({ setNavLinkClass }) => {
  return (
    <li className="nav-item">
      <NavLink className={setNavLinkClass} aria-current="page" to={"/"}>
        <span>Home</span>
      </NavLink>
    </li>
  );
};

export default HomeNav;
