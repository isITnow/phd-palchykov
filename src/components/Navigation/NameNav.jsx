import React from "react";
import { Link } from "react-router-dom";

const NameNav = () => {
  return (
    <Link className="navbar-brand fw-bold" to={"/"}>
      <span>Prof. Dr. </span>
      <span className="text-primary fs-5">Vitalii Palchykov</span>
    </Link>
  );
};

export default NameNav;
