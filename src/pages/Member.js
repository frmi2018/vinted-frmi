// dependancies
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// components
import Avatars from "../components/Avatars/Avatars";

const Member = ({ userToken, userInfos }) => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lineToModify, setLineToModify] = useState("");

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

  const handleUsernameChange = (e) => {
    setLineToModify(1);
  };

  const handleUsernameSave = (e) => {
    setLineToModify(0);
  };

  const handleEmailChange = (e) => {
    setLineToModify(2);
  };

  const handleEmailSave = (e) => {
    setLineToModify(0);
  };

  const handlePhoneChange = (e) => {
    setLineToModify(3);
  };

  const handlePhoneSave = (e) => {
    setLineToModify(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(
        //   `http://localhost:4000/user/?id=${id}`
        // );
        const response = await axios.get(
          `https://vinted-frmi-api.herokuapp.com/user/?id=${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <div className="d-flex justify-content-center align-items-center ">
      <div className="spinner-border text-primary m-4" role="status" />
      <span>Chargement des infos cours...</span>
    </div>
  ) : userToken ? (
    <div>
      <table className="table table-bordered mt-2 table-light">
        <thead>
          <tr>
            <td colSpan="3">
              <div className="d-flex flex-column align-items-center">
                <div>
                  {/* Avatar */}
                  {Object.keys(userInfos).length !== 0 && (
                    <Avatars userInfos={userInfos} />
                  )}
                </div>
                <button className="btn btn-warning">Modifier</button>
              </div>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center align-middle">
            <td>Username</td>
            <td>
              {lineToModify === 1 ? (
                <input type="text" placeholder={data.account.username} />
              ) : (
                <span>{data.account.username}</span>
              )}
            </td>
            <td>
              {lineToModify === 1 ? (
                <button
                  className="btn btn-primary"
                  onClick={() => handleUsernameSave()}
                >
                  Sauver
                </button>
              ) : (
                <button
                  className="btn btn-warning"
                  onClick={() => handleUsernameChange()}
                >
                  Modifier
                </button>
              )}
            </td>
          </tr>

          <tr className="text-center align-middle">
            <td>Email</td>
            <td>
              {lineToModify === 2 ? (
                <input type="mail" placeholder={data.email} />
              ) : (
                <span>{data.email}</span>
              )}
            </td>
            <td>
              {lineToModify === 2 ? (
                <button
                  className="btn btn-primary"
                  onClick={() => handleEmailSave()}
                >
                  Sauver
                </button>
              ) : (
                <button
                  className="btn btn-warning"
                  onClick={() => handleEmailChange()}
                >
                  Modifier
                </button>
              )}
            </td>
          </tr>

          <tr className="text-center align-middle">
            <td width="120px">Phone</td>
            <td>
              {lineToModify === 3 ? (
                <input type="phone" placeholder={data.account.phone} />
              ) : (
                <span>{data.account.phone}</span>
              )}
            </td>
            <td width="120px">
              {lineToModify === 3 ? (
                <button
                  className="btn btn-primary"
                  onClick={() => handlePhoneSave()}
                >
                  Sauver
                </button>
              ) : data.account.phone === undefined ? (
                <button
                  className="btn btn-success"
                  onClick={() => handlePhoneChange()}
                >
                  Ajouter
                </button>
              ) : (
                <button
                  className="btn btn-warning"
                  onClick={() => handlePhoneChange()}
                >
                  Modifier
                </button>
              )}
            </td>
          </tr>

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
        </tbody>

        <tfoot style={{ fontSize: "small" }}>
          <tr>
            <td colSpan="3">
              <div align="right">
                <button className="btn btn-danger">
                  Supprimer votre compte
                </button>
              </div>
              <div>
                <span>ID : </span>
                <span>{id}</span>
              </div>
              <span>Infos : page en cours de réalisation...</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  ) : null;
};
export default Member;
