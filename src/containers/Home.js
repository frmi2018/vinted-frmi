import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      //   console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Chargement des annonces en cours...</p>
  ) : (
    <div>
      {data.offers.map((offer, index) => {
        return <div key={offer._id}>{offer.product_name}</div>;
      })}
    </div>
  );
};

export default Home;
