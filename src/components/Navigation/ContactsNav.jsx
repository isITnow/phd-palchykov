import { NavLink } from "react-router-dom";

const ContactsNav = ({ setNavLinkClass }) => {
  return (
    <li className="nav-item">
      <NavLink className={setNavLinkClass} to={"contacts"}>
        <span>Contacts</span>
      </NavLink>
    </li>
  );
};

export default ContactsNav;
