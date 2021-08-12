// dependancies
import React, { useState } from "react";

const MemberPasswordChange = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visiblePass, setVisiblePass] = useState(false);

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  return (
    <tr>
      <td colSpan="3">
        <div className="input-group mb-2">
          <input
            className="form-control"
            type={visiblePass === true ? "text" : "password"}
            placeholder="Ancien mot de passe"
            value={oldPassword}
            onChange={handleOldPasswordChange}
          />
          <div className="input-group-append">
            <span className="input-group-text">
              {visiblePass ? (
                <i
                  className="bi bi-eye-slash"
                  onClick={() => {
                    setVisiblePass(false);
                  }}
                />
              ) : (
                <i
                  className="bi bi-eye"
                  onClick={() => {
                    setVisiblePass(true);
                  }}
                />
              )}
            </span>
          </div>
        </div>
        <div className="input-group mb-2">
          <input
            className="form-control"
            type={visiblePass === true ? "text" : "password"}
            placeholder="Nouveau mot de passe"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          <div className="input-group-append">
            <span className="input-group-text">
              {visiblePass ? (
                <i
                  className="bi bi-eye-slash"
                  onClick={() => {
                    setVisiblePass(false);
                  }}
                />
              ) : (
                <i
                  className="bi bi-eye"
                  onClick={() => {
                    setVisiblePass(true);
                  }}
                />
              )}
            </span>
          </div>
        </div>
        <div className="input-group mb-2">
          <input
            className="form-control"
            type={visiblePass === true ? "text" : "password"}
            placeholder="Confirm mot de passe"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <div className="input-group-append">
            <span className="input-group-text">
              {visiblePass ? (
                <i
                  className="bi bi-eye-slash"
                  onClick={() => {
                    setVisiblePass(false);
                  }}
                />
              ) : (
                <i
                  className="bi bi-eye"
                  onClick={() => {
                    setVisiblePass(true);
                  }}
                />
              )}
            </span>
          </div>
        </div>
        <div align="center">
          <button className="btn btn-warning">Changer mot de pass</button>
        </div>
      </td>
    </tr>
  );
};

export default MemberPasswordChange;
