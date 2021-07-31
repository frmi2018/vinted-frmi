import "./header.css";
// dependancies
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Range, getTrackBackground } from "react-range";

import logoVinted from "../assets/images/logo_vinted.png";

const Header = (props) => {
  const {
    userToken,
    setUser,
    setSearch,
    priceMin,
    setPriceMin,
    priceMax,
    setPriceMax,
    sortFilter,
    setSortFilter,
    userInfos,
    setUserInfos,
  } = props;

  let location = useLocation();

  const [sortIsActive, setSortIsActive] = useState(false);
  const [values, setValues] = useState([priceMin, priceMax]);

  //  functions

  const handleSortClick = () => {
    setSortIsActive(!sortIsActive);
    if (sortFilter === "price-asc") setSortFilter("price-desc");
    else setSortFilter("price-asc");
  };

  const handleChangePrice = () => {
    setPriceMin(values[0]);
    setPriceMax(values[1]);
  };

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <header className="container p-2 bg-light border-bottom">
      <nav className="navbar navbar-expand-lg navbar-light">
        {/* header left */}
        <div className="d-flex">
          <Link to="/" className="navbar-brand nav-link">
            <img src={logoVinted} alt="logo-vinted" width="100" />
          </Link>
        </div>

        {location.pathname === "/" && (
          <>
            {/* header center */}
            <form className="form-inline">
              {/* search */}
              <div className="input-group">
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
              {/* filters price*/}
              <div className="filters-price">
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
                  className={
                    sortIsActive ? `filter-sort isActive` : "filter-sort"
                  }
                ></div>

                <Range
                  step={100}
                  min={0}
                  max={50000}
                  values={values}
                  onChange={(values) => setValues([...values])}
                  onFinalChange={handleChangePrice}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "2px",
                        width: "50%",
                        marginRight: "2em",
                        background: getTrackBackground({
                          values,
                          colors: ["#ccc", "#2baeb7", "#ccc"],
                          min: 0,
                          max: 50000,
                        }),
                      }}
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ index, props }) => (
                    // dots
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "1em",
                        width: "1em",
                        backgroundColor: "#2baeb7",
                        borderRadius: "50%",
                        outline: "none",
                      }}
                    >
                      {/* values */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: "-16px",
                          color: "#2baeb7",
                          fontWeight: "bold",
                          fontSize: "0.7em",
                        }}
                      >
                        {values[index] + "€"}
                      </div>
                      {/* label */}
                      <div
                        style={{
                          position: "absolute",
                          top: "-12px",
                          color: "#2baeb7",
                          fontWeight: "bold",
                          fontSize: "0.5em",
                        }}
                      >
                        {index === 0 ? "MIN" : "MAX"}
                      </div>
                    </div>
                  )}
                />
              </div>
            </form>
          </>
        )}

        {/* header right */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <ul className="navbar-nav d-flex align-items-center">
            {userToken ? (
              <li className="nav-item">
                <button
                  className="btn btn-outline-danger"
                  type="button"
                  onClick={() => {
                    setUser(null);
                    setUserInfos({});
                  }}
                >
                  Se déconnecter
                </button>
              </li>
            ) : (
              <li className="nav-item mx-2">
                <div className="border border-outline-primary">
                  <Link to="/signup" className="mx-2">
                    S'inscrire
                  </Link>
                  |
                  <Link to="/login" className="mx-2">
                    Se connecter
                  </Link>
                </div>
              </li>
            )}
            <li className="nav-item">
              <Link to="/publish" className="nav-link">
                <button className="btn btn-primary" type="button">
                  Vends maintenant
                </button>
              </Link>
            </li>
          </ul>
        </div>
        {/* afficher profil si userInfos non vide */}
        {Object.keys(userInfos).length !== 0 &&
          (userInfos.account.avatar !== "" ? (
            // affiche image du profil
            <div className="avatar m-2">
              <img
                style={{ width: "50px", height: "50px", borderRadius: "25px" }}
                src={userInfos.account.avatar.secure_url}
                alt="image profil"
              />
            </div>
          ) : (
            // affiche première lette
            <div className="d-flex align-items-center">
              <div
                className="avatar m-2"
                style={{ backgroundColor: getRandomColor() }}
              >
                {userInfos.account.username.charAt(0).toUpperCase()}
              </div>
            </div>
          ))}
      </nav>
    </header>
  );
};

export default Header;
