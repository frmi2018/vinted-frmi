import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

const Offer = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchData();
  }, []);

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return isLoading ? (
    <div className="d-flex justify-content-center align-items-center ">
      <div className="spinner-border text-primary m-4" role="status" />
      <span>Chargement des infos de l'annonce en cours...</span>
    </div>
  ) : (
    <div className="card">
      <div className="row">
        <div className="col">
          <img src={data.product_image.secure_url} alt={data.product_name} />
        </div>
        <div className="col">
          <div className="card-body">
            <h2 className="card-title">{data.product_price} €</h2>
            <table className="table-borderless">
              <tbody>
                {data.product_details.map((item, index) => {
                  const keys = Object.keys(item);
                  return (
                    keys[0] !== "MODES DE PAIEMENT" && (
                      <tr
                        key={index}
                        className="d-flex justify-content-between"
                      >
                        <td>{keys[0]}</td>
                        <td>{item[keys[0]]}</td>
                      </tr>
                    )
                  );
                })}
              </tbody>
            </table>
            <hr />
            <h2>{data.product_name}</h2>
            <p>{data.product_description}</p>
            <div className="d-flex align-items-center">
              <div
                className="avatar m-2"
                style={{ backgroundColor: getRandomColor() }}
              >
                {data.owner.account.username.charAt(0).toUpperCase()}
              </div>
              <span>{data.owner.account.username}</span>
            </div>

            <button className="btn btn-primary" type="button">
              Acheter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
