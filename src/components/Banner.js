import "./banner.css";
import "./home_hero_ready_container.css";
// dependancies
import React from "react";
import tear from "../assets/images/tear.svg";
import { useHistory } from "react-router-dom";

const Banner = () => {
  const history = useHistory();
  return (
    <div className="home-hero-bg-img">
      {/* effet déchirure */}
      <img src={tear} alt="forme" className="home-hero-forme" />
      {/* home-hero-ready-container */}
      <div className="home-hero-ready-container">
        <div className="home-hero-ready-card">
          <span>Prêts à faire du tri dans vos placards ?</span>
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              history.push("/publish");
            }}
          >
            Vends maintenant
          </button>
          <a href="/">
            <span className="text-link">Découvrir comment ça marche</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
