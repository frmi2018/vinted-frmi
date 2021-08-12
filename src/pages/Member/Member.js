// dependancies
import React, { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import axios from "axios";
// components
import Avatars from "../../components/Avatars/Avatars";
import MemberLine from "./MemberLine"; // Username
import MemberLine2 from "./MemberLine2"; // Email
import MemberLine3 from "./MemberLine3"; // Phone
import MemberPasswordChange from "./MemberPasswordChange";

const Member = ({ userToken, userInfos }) => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [lineActive, setLineActive] = useState(0);

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
    Object.keys(userInfos).length !== 0 ? (
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
            <MemberLine
              data={data}
              setLineActive={setLineActive}
              lineActive={lineActive}
            />
            <MemberLine2
              data={data}
              setLineActive={setLineActive}
              lineActive={lineActive}
            />
            <MemberLine3
              data={data}
              setLineActive={setLineActive}
              lineActive={lineActive}
            />
            <MemberPasswordChange />
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
    ) : (
      <Redirect to="/login" />
    )
  ) : (
    <Redirect to="/login" />
  );
};
export default Member;
