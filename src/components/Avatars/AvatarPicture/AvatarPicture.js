import "../avatar.css";
// Dependancies
import React from "react";

function AvatarPicture({ userInfos }) {
  return (
    <div className="avatar m-2">
      <img src={userInfos.account.avatar.secure_url} alt="avatar" />
    </div>
  );
}

export default AvatarPicture;
