import "./banner.css";
// dependancies
import React from "react";
import background_img from "./assets/images/hero.jpg";
// components
import HeroContainer from "./HeroContainer/HeroContainer";

const Banner = () => {
  return (
    <div className="hero-block">
      <div className="hero-block-background">
        <img src={background_img} alt="hero background"></img>
        {/* effet déchirure */}
        <div className="tear" />
        <div className="ready-block">
          <HeroContainer />
        </div>
      </div>
    </div>
  );
};

export default Banner;
