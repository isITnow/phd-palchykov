import { NavLink } from "react-router-dom";

const ColleaguesNav = ({ setNavLinkClass }) => {
  return (
    <li className="nav-item">
      <NavLink className={setNavLinkClass} to={"colleagues"}>
        <span>Colleagues</span>
      </NavLink>
    </li>
  );
};

export default ColleaguesNav;
