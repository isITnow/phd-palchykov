import { NavLink } from "react-router-dom";

const ResearchNav = ({ setNavLinkClass }) => {
  return (
    <li className="nav-item">
      <NavLink className={setNavLinkClass} to={"researches"}>
        <span>Research</span>
      </NavLink>
    </li>
  );
};

export default ResearchNav;
