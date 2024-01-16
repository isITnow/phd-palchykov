import { NavLink } from "react-router-dom";

const NewsNav = ({ setNavLinkClass }) => {
  return (
    <li className="nav-item">
      <NavLink className={setNavLinkClass} to={"/news"}>
        <span>News</span>
      </NavLink>
    </li>
  );
};

export default NewsNav;
