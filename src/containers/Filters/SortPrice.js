import "./sort-price.css";
import React, { useState } from "react";

export const SortPrice = ({ sortFilter, setSortFilter }) => {
  const [sortIsActive, setSortIsActive] = useState(false);
  const handleSortClick = () => {
    setSortIsActive(!sortIsActive);
    if (sortFilter === "price-asc") setSortFilter("price-desc");
    else setSortFilter("price-asc");
  };
  return (
    <div className="sort-price-container">
      <span>TRI</span>
      <div
        onClick={handleSortClick}
        className={sortIsActive ? `filter-sort isActive` : "filter-sort"}
      ></div>
    </div>
  );
};

export default SortPrice;
