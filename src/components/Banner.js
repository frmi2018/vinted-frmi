import React from "react";
import banner from "../assets/images/banner_wide.jpg";

const Banner = () => {
  return (
    <div className="container p-0">
      <img src={banner} alt="banner" width="100%" height="480" />
    </div>
  );
};

export default Banner;
