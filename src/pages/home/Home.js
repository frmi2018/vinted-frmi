import "./home.css";

import React, { useState, useEffect } from "react";
import Banner from "../../components/Banner/Banner";
import axios from "axios";
import { Link } from "react-router-dom";

// components
import CardOffer from "./cardoffer/CardOffer";

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
          `https://vinted-frmi-api.herokuapp.com/offers?title=${search}&pricemin=${priceMin}&pricemax=${priceMax}&sort=${sortFilter}`
        );
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
                    <CardOffer offer={offer} />
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
