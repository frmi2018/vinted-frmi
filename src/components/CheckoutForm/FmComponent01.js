import React from "react";

const FmComponent01 = ({ txt, number }) => {
  return (
    <div className="d-flex justify-content-between">
      <span>{txt}</span>
      <span>{number} €</span>
    </div>
  );
};

export default FmComponent01;
