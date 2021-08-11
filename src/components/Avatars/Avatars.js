import React from "react";

// components
import AvatarLetter from "../../components/Avatars/AvatarLetter/AvatarLetter";
import AvatarPicture from "../../components/Avatars/AvatarPicture/AvatarPicture";

const Avatars = ({ userInfos }) => {
  return (
    <div className="d-flex align-items-center">
      {userInfos.account.avatar !== undefined ? (
        <AvatarPicture userInfos={userInfos} />
      ) : (
        <AvatarLetter userInfos={userInfos} />
      )}
    </div>
  );
};

export default Avatars;
