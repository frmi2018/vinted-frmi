import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
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

  return (
    <>
      <Banner />
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center ">
          <div className="spinner-border text-primary m-4" role="status" />
          <span>Chargement des annonces en cours...</span>
        </div>
      ) : (
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h2>Articles populaires</h2>
            <span>Voir tout</span>
          </div>

          <div className="row row-cols-1 row-cols-md-5 g-4">
            {data.offers.map((offer, index) => {
              return (
                <Link to={`/offer/${offer._id}`} key={offer._id}>
                  <div className="card h-100">
                    <img
                      src={offer.product_image.secure_url}
                      className="card-img-top"
                      alt={offer.product_name}
                    />
                    <ul className="list-group border-top">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0">
                        <div className="d-flex justify-content-between align-items-center">
                          <h4>{offer.product_price}€</h4>
                        </div>
                        <i className="bi-heart"></i>
                      </li>
                      {/* Show only ... */}
                      {offer.product_details.map((item, index) => {
                        const keys = Object.keys(item);
                        return keys[0] === "TAILLE" ? (
                          <li className="list-group-item border-0">
                            {item[keys[0]]}
                          </li>
                        ) : keys[0] === "MARQUE" ? (
                          <li className="list-group-item border-0">
                            {item[keys[0]]}
                          </li>
                        ) : null;
                      })}
                    </ul>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
