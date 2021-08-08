import "./members.css";
// dependancies
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Member = ({ userToken, userInfos }) => {
  console.log(userInfos);
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("Messages");
  // Extras
  const [visiblePass, setVisiblePass] = useState(false);

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get(
        //   `http://localhost:4000/user/member/${id}`
        // );
        const response = await axios.get(
          `https://vinted-frmi-api.herokuapp.com/user/member/${id}`
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
  ) : (
    <table className="table">
      <tbody>
        <tr>
          <td
            rowSpan="5"
            style={{
              textAlign: "center",
              verticalAlign: "middle",
            }}
          >
            <div className="d-flex flex-column align-items-center">
              <img
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50px",
                  margin: "4px",
                }}
                src={data.avatar}
                alt="profil"
              />
              <button className="btn btn-warning">Modifier</button>
            </div>
          </td>
          <td>Username</td>
          <td>{data.username}</td>
          <td>
            <button className="btn btn-warning">Modifier</button>
          </td>
        </tr>

        <tr>
          <td>email</td>
          <td>{data.email}</td>
          <td>
            <button className="btn btn-warning">Modifier</button>
          </td>
        </tr>

        <tr>
          <td>phone</td>
          <td>{data.phone}</td>
          <td>
            {data.phone === undefined ? (
              <button className="btn btn-success">Ajouter</button>
            ) : (
              <button className="btn btn-warning">Modifier</button>
            )}
          </td>
        </tr>

        <tr className="change-password">
          <td colSpan="3">
            <div>Change password</div>

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

            <div>
              <button
                className="btn btn-warning"
                onClick={handleOldPasswordChange}
              >
                Modifier
              </button>
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan="4" className="text-center">
            <span className="text-danger">{errorMessage}</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
export default Member;
