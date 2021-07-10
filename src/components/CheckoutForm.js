import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";

import FmComponent01 from "./FmComponent01";
import axios from "axios";

const CheckoutForm = ({ userToken }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCompleted, setTransactionCompleted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // 1 récupérer les données bancaires rentrées par l'utilisateur
    const cardElement = elements.getElement(CardElement);
    // 2 validation de la carte bancaire par Stipe (demander la création d'un token)
    try {
      const stripeResponse = await stripe.createToken(cardElement, {
        name: `Paiement de ${userToken} pour objet Vinted.`,
      });
      // console.log(stripeResponse);
      // 3 récupérer le token de Stripe et envoi de celui-ci vers notre serveur
      const stripeToken = stripeResponse.token.id;
      await axios.post("https://vinted-frmi-api.herokuapp.com/payment", {
        stripeToken: stripeToken,
      });
      // console.log(response.data);
      setIsLoading(false);
      setTransactionCompleted(true);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleChange = () => {
    setCompleted(false);
    elements.getElement(CardElement).on("change", (event) => {
      if (event.complete) {
        setCompleted(true);
      }
    });
  };

  return (
    <div className="container-fluid p-2 bg-light">
      <div className="card">
        <div className="card-body">
          <span>Résumé de la commande</span>
          <div>
            <FmComponent01 txt="Commande" number="2.99" />
            <FmComponent01 txt="Frais de protection acheteurs" number="0.30" />
            <FmComponent01 txt="Frais de port" number="0.60" />
          </div>
          <hr />
          <div>
            <FmComponent01 txt="Total" number="3.89" />
          </div>
          <span>
            Il ne vous reste plus qu'une étape pour vous offrir NOM. vous allez
            payer PRIX € (frais de protection et frais de port inclus).
          </span>
          <div className="p-4">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              {isLoading ? (
                <div className="d-flex justify-content-center align-items-center ">
                  <div
                    className="spinner-border text-primary m-4"
                    role="status"
                  />
                  <span>Paiement en cours...</span>
                </div>
              ) : transactionCompleted ? (
                <div className="container text-center bg-light p-2">
                  <div className="d-flex text-success align-items-center justify-content-center">
                    <div>
                      <i className="bi bi-check" />
                    </div>
                  </div>
                  <div>
                    <Link to="/">
                      <button className="btn btn-success mt-2" type="text">
                        Go to home
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="row p-2">
                  <button
                    className="btn btn-primary mt-2"
                    type="submit"
                    disabled={!completed}
                  >
                    Payer
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
