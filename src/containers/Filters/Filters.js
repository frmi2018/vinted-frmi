import "./filters.css";

import React from "react";
import SortPrice from "./SortPrice";
import InputSearch from "./InputSearch";
import InputRange from "./InputRange";

const Filters = ({
  setSearch,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  sortFilter,
  setSortFilter,
}) => {
  return (
    <form className="form-inline d-flex align-items-center justify-content-between w-100">
      <InputSearch setSearch={setSearch} />
      <SortPrice sortFilter={sortFilter} setSortFilter={setSortFilter} />
      <InputRange
        priceMin={priceMin}
        setPriceMin={setPriceMin}
        priceMax={priceMax}
        setPriceMax={setPriceMax}
      />
    </form>
  );
};

export default Filters;
