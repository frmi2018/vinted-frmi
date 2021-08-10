import "./input-search.css";

import React from "react";

export const InputSearch = ({ setSearch }) => {
  return (
    <div className="input-container">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className="bi bi-search" />
        </span>
      </div>
      <input
        className="form-control"
        type="search"
        placeholder="Recherche des articles"
        aria-label="Search"
        onChange={(event) => {
          if (event.target.value.length > 1) {
            event.preventDefault();
            setSearch(event.target.value);
          } else {
            if (event.target.value === "") {
              setSearch("");
            }
          }
        }}
      />
    </div>
  );
};

export default InputSearch;
