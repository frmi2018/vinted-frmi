import "./filters.css";

import React from "react";
// components
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
    <form className="form-inline">
      <InputSearch setSearch={setSearch} />
      <div className="form-inline-right">
        <SortPrice sortFilter={sortFilter} setSortFilter={setSortFilter} />
        <InputRange
          priceMin={priceMin}
          setPriceMin={setPriceMin}
          priceMax={priceMax}
          setPriceMax={setPriceMax}
        />
      </div>
    </form>
  );
};

export default Filters;
