// dependancies
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Member = ({ userToken, userInfos }) => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
            rowSpan="3"
            style={{
              textAlign: "center",
              verticalAlign: "middle",
            }}
          >
            <img
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50px",
              }}
              src={data.avatar}
              alt="profil"
            />
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
      </tbody>
    </table>
  );
};
export default Member;
