import "./offer.css";
// dependancies
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
// components
import Avatars from "../../components/Avatars/Avatars";

const Offer = ({ userToken, userInfos }) => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://vinted-frmi-api.herokuapp.com/offer/${id}`
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
      <span>Chargement des infos de l'annonce en cours...</span>
    </div>
  ) : (
    <div className="container p-2 bg-light">
      <div className="card">
        <div className="card-body d-md-flex">
          <div className="left-col d-flex flex-column justify-content-center">
            <div>
              <div className="active-img d-flex justify-content-center">
                <img
                  src={data.product_image.secure_url}
                  alt={data.product_name}
                />
              </div>
            </div>
            {/* Galerie si plus d'une image */}
            {/* <div className="d-flex justify-content-between mt-2">
              <div className="inactive-img">
                <img src={data.product_image.secure_url} alt="Gallery 2" />
              </div>
              <div className="inactive-img">
                <img src={data.product_image.secure_url} alt="Gallery 3" />
              </div>
              <div className="inactive-img">
                <img src={data.product_image.secure_url} alt="Gallery 4" />
              </div>
              <div className="inactive-img">
                <img src={data.product_image.secure_url} alt="Gallery 5" />
              </div>
            </div> */}
          </div>
          <div className="right-col">
            <h1 className="card-title">{data.product_name}</h1>
            <h2>{data.product_price} €</h2>
            <p className="text-justify">{data.product_description}</p>

            <div className="d-flex flex-column border-top">
              <table className="table-borderless w-100 my-2">
                <tbody>
                  {data.product_details.map((item, index) => {
                    const keys = Object.keys(item);
                    return (
                      keys[0] !== "MODES DE PAIEMENT" && (
                        <tr key={index}>
                          <td>{keys[0]}</td>
                          <td>{item[keys[0]]}</td>
                        </tr>
                      )
                    );
                  })}
                </tbody>
              </table>
              <Avatars userInfos={data.owner} />
              <Link
                to={{
                  pathname: `/payment/${id}`,
                  state: { userToken: userToken, userInfos: userInfos },
                }}
              >
                <div className="d-grid gap-2">
                  <button className="btn btn-primary mt-2" type="button">
                    Acheter
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
