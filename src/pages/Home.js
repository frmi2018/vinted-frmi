import "./home.css";

import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = (props) => {
  const { search, priceMin, priceMax, sortFilter } = props;
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(true);

  // Charger les annonces
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `http://localhost:4000/offers?title=${search}&pricemin=${priceMin}&pricemax=${priceMax}&sort=${sortFilter}`
          `https://vinted-frmi-api.herokuapp.com/offers?title=${search}&pricemin=${priceMin}&pricemax=${priceMax}&sort=${sortFilter}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchData();
  }, [search, priceMin, priceMax, sortFilter]);

  return (
    <>
      <Banner />
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center ">
          <div className="spinner-border text-primary m-4" role="status" />
          <span>Chargement des annonces en cours...</span>
        </div>
      ) : (
        <div className="container p-2 bg-light">
          <section>
            <div className="card-offers-container-label">
              <h2>Articles populaires</h2>
              <span
                onClick={() => {
                  setShowAll(!showAll);
                }}
              >
                {showAll ? "Masquer" : "Afficher tout"}
              </span>
            </div>
            <div className={showAll ? "card-offers-container" : "invisible"}>
              {data.offers.map((offer) => {
                return (
                  <Link to={`/offer/${offer._id}`} key={offer._id}>
                    <div className="card-offer">
                      <div className="card-offer-picture-container">
                        <img
                          src={offer.product_image.secure_url}
                          alt={offer.product_name}
                        />
                      </div>
                      <div className="card-offer-description">
                        <ul>
                          <li>
                            <div>
                              <h4>{offer.product_price}€</h4>

                              <i className="bi-heart"></i>
                            </div>
                          </li>
                          {/* Show only ... */}
                          {offer.product_details.map((item, index) => {
                            const keys = Object.keys(item);
                            return keys[0] === "TAILLE" ||
                              keys[0] === "MARQUE" ? (
                              <li key={index}>{item[keys[0]]}</li>
                            ) : null;
                          })}
                        </ul>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Home;
