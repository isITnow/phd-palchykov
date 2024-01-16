import { NavLink } from "react-router-dom";

const BlogNav = ({ setNavLinkClass }) => {
  return (
    <li className="nav-item">
      <NavLink className={setNavLinkClass} to={"posts"}>
        <span>Blog</span>
      </NavLink>
    </li>
  );
};

export default BlogNav;
