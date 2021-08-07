import "./cardOffer.css";

import React from "react";

const CardOffer = ({ offer }) => {
  return (
    <div className="card-offer">
      <div className="card-offer-picture-container">
        <img src={offer.product_image.secure_url} alt={offer.product_name} />
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
            return keys[0] === "TAILLE" || keys[0] === "MARQUE" ? (
              <li key={index}>{item[keys[0]]}</li>
            ) : null;
          })}
        </ul>
      </div>
    </div>
  );
};

export default CardOffer;
