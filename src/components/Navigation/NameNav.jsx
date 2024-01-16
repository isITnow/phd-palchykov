import { Link } from "react-router-dom";
import navTabs from "../../assets/navTabs";

const NameNav = () => {
  return (
    <Link className="navbar-brand fw-bold" to={navTabs.root.path}>
      <span>Prof. Dr. </span>
      <span className="text-primary fs-5">Vitalii Palchykov</span>
    </Link>
  );
};

export default NameNav;
