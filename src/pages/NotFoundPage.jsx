import React from "react";

const NotFoundPage = () => {
  return (
    <div className="mx-auto my-auto text-center">
      <h1 className="text-danger fw-bold" style={{ fontSize: "5rem" }}>
        404
      </h1>
      <span className="text-uppercase fw-bold fs-2">page not found</span>
    </div>
  );
};

export default NotFoundPage;
