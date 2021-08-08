import React, { useState } from "react";

export const SortPrice = ({ sortFilter, setSortFilter }) => {
  const [sortIsActive, setSortIsActive] = useState(false);
  const handleSortClick = () => {
    setSortIsActive(!sortIsActive);
    if (sortFilter === "price-asc") setSortFilter("price-desc");
    else setSortFilter("price-asc");
  };
  return (
    <div className="d-flex flex-column align-items-center">
      <span
        style={{
          color: "#2baeb7",
          fontWeight: "bold",
          fontSize: "0.5em",
          marginRight: "5px",
        }}
      >
        TRI
      </span>
      <div
        onClick={handleSortClick}
        className={sortIsActive ? `filter-sort isActive` : "filter-sort"}
      ></div>
    </div>
  );
};

export default SortPrice;
