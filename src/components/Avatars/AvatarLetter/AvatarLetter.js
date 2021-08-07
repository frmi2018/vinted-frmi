import "../avatar.css";
// Dependancies
import React from "react";

function AvatarLetter({ userInfos }) {
  // Tirer une couleur au hazard
  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  return (
    <div className="d-flex align-items-center">
      <div className="avatar m-2" style={{ backgroundColor: getRandomColor() }}>
        {userInfos.account.username.charAt(0).toUpperCase()}
      </div>
    </div>
  );
}

export default AvatarLetter;
