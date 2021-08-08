// ***********************************************************************************************
// La partie paiement fonctionne mais n'est pas disponible en ligne pour éviter tout problème
// Il faut décommenter les lignes : 8, 17-19, 23, 55, 58-60, 62-71, 80-85, 178-184 pour l'utiliser
// ***********************************************************************************************
import "../CheckoutForm/checkoutForm.css";
import videomp4 from "../../assets/videos/demo.mp4";
import videowebm from "../../assets/videos/demo.webm";

// Dependancies
import React, { useState, useEffect } from "react";
import { CardElement } from "@stripe/react-stripe-js";
// import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Redirect, Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
// Components
import FmComponent01 from "./FmComponent01";

const CheckoutForm = (props) => {
  const { userToken, id } = props;
  // const {userInfos} = props;
  // const stripe = useStripe();
  // const elements = useElements();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCompleted, setTransactionCompleted] = useState(false);
  // const [completed, setCompleted] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // charger infos offre
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // 1 récupérer les données bancaires rentrées par l'utilisateur
    // const cardElement = elements.getElement(CardElement);
    // 2 validation de la carte bancaire par Stipe (demander la création d'un token)
    try {
      // const stripeResponse = await stripe.createToken(cardElement, {
      //   name: `Paiement de ${userInfos.account.username} pour objet ${data.product_name}.`,
      // });
      // 3 récupérer le token de Stripe et envoi de celui-ci vers notre serveur
      // const stripeToken = stripeResponse.token.id;
      // Product
      // axios.post("https://vinted-frmi-api.herokuapp.com/payment", {
      //   stripeToken: stripeToken,
      //   userName: userInfos.account.username,
      //   userId: userInfos.id,
      //   objectName: data.product_name,
      //   // TODO: Envoyer le prix de objet en centimes
      //   // objectPrice: data.product_price,
      // });
      setIsLoading(false);
      setTransactionCompleted(true);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleChange = () => {
    // setCompleted(false);
    // elements.getElement(CardElement).on("change", (event) => {
    //   if (event.complete) {
    //     setCompleted(true);
    //   }
    // });
  };

  return userToken ? (
    <div className="container-fluid p-2 bg-light">
      <div className="card">
        <div className="card-body">
          <span>Résumé de la commande</span>
          <div>
            <FmComponent01 txt="Commande" number={data.product_price} />
            <FmComponent01 txt="Frais de protection acheteurs" number="0.30" />
            <FmComponent01 txt="Frais de port" number="0.60" />
          </div>
          <hr />
          <div>
            <FmComponent01
              txt="Total"
              number={parseFloat(data.product_price + 0.9).toFixed(2)}
            />
          </div>
          <div className="mt-3 text-center">
            <span>
              Il ne vous reste plus qu'une étape pour vous offrir{" "}
              <strong>{data.product_name}</strong>. Vous allez payer{" "}
              <strong>{parseFloat(data.product_price + 0.9).toFixed(2)}</strong>{" "}
              € frais de protection et frais de port inclus.
            </span>
          </div>

          <div className="d-flex flex-column justify-content-center align-items-center my-2">
            <span className="text-danger text-center">
              ATTENTION SITE FICTIF N'ENTREZ PAS VOTRE NUMERO DE CB
              <br />
              Pour éviter tout problème la partie paiement n'est pas utilisable
              mais uniquement visible en vidéo.
            </span>
            <Button variant="primary" onClick={openModal} className="m-2">
              Voir la vidéo
            </Button>

            <Modal show={isOpen} onHide={closeModal}>
              <Modal.Header>
                <Modal.Title>Demo</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <video controls style={{ width: "100%", height: "auto" }}>
                    <source src={videomp4} type="video/mp4" />
                    <source src={videowebm} type="video/webm" />
                    Sorry, your browser doesn't support the video tag but you
                    can{" "}
                    <a href="http://portfolio.michaudfranck.ovh/assets/videos/demo.mp4">
                      download (723Ko)
                    </a>{" "}
                    it.
                  </video>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>

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
                  {/* <button
                    className="btn btn-primary mt-2"
                    type="submit"
                    disabled={!completed}
                  >
                    Payer
                  </button> */}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default CheckoutForm;
