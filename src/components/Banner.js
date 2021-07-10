import React from "react";
import hero from "../assets/images/hero.jpg";
import forme from "../assets/forme.svg";
import { useHistory } from "react-router-dom";

const Banner = () => {
  const history = useHistory();
  return (
    <div className="position-relative">
      <img src={hero} alt="hero" style={{ width: "100%", height: "480px" }} />
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "white",
          position: "absolute",
          width: "35%",
          bottom: 100,
          left: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 20,
        }}
      >
        <span className="mb-3">Prêts à faire du tri dans vos placards ?</span>
        <button
          className="btn btn-primary"
          onClick={() => {
            history.push("/publish");
          }}
        >
          Commencer à vendre
        </button>
      </div>
      <img
        src={forme}
        alt="forme"
        style={{
          color: "white",
          position: "absolute",
          bottom: -1,
          left: "25%",
        }}
      />
    </div>
  );
};

export default Banner;
