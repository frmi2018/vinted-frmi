import "./banner.css";
import React from "react";
import tear from "../assets/images/tear.svg";
import { useHistory } from "react-router-dom";

const Banner = () => {
  const history = useHistory();
  return (
    <div className="home-hero-bg-img">
      {/* effet déchirure */}
      <img src={tear} alt="forme" className="home-hero-forme" />
      <div className="home-hero-ready d-grid">
        <span className="mb-3">Prêts à faire du tri dans vos placards ?</span>
        <button
          className="btn btn-primary btn-lg"
          type="button"
          onClick={() => {
            history.push("/publish");
          }}
        >
          Commencer à vendre
        </button>
      </div>
    </div>
  );
};

export default Banner;
