import { NavLink } from 'react-router-dom';

const NavItem = ({ menuTitle, path, setNavLinkClass }) => (
  <li className="nav-item">
    <NavLink className={setNavLinkClass} to={path}>
      <span>{menuTitle}</span>
    </NavLink>
  </li>
);

export default NavItem;
