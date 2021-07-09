import React from "react";
import logoVinted from "../assets/images/logo_vinted.png";
import { Link } from "react-router-dom";

const Header = ({ userToken, setUser }) => {
  return (
    <header className="container p-2 bg-light border-bottom">
      <nav className="navbar navbar-expand-lg navbar-light">
        {/* header left */}

        <Link to="/" className="navbar-brand nav-link">
          <img src={logoVinted} alt="logo-vinted" width="100" />
        </Link>

        {/* header center */}
        <form className="form-inline">
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
            />
          </div>
        </form>

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
      </nav>
    </header>
  );
};

export default Header;
