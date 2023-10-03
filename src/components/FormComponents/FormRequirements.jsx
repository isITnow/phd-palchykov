import React from "react";

const FormRequirements = ({ requirementsList }) => {
  return (
    <div className="col-md-6 mb-3">
      <p className="mb-2 px-3 text-secondary fw-bolder">required fields:</p>
      <ul className="list-group list-group-numbered">
        {requirementsList.map((requirement, index) => (
          <li key={index} className="list-group-item">
            {requirement}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormRequirements;
