import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";

import CheckoutForm from "../components/CheckoutForm/CheckoutForm";

// Stripe Public key
const stripePromise = loadStripe(
  "pk_test_51IpxOCEJMbc8mz3C6JeqrGGb9kLBr2sqsOQdD62mLKaroQNrQnAHSoiWx5GmcR9cBXL9sF19IsAo5fcjzJvjEvjF00iPHaIQ9v"
);

const Payment = ({ userToken, userInfos }) => {
  const { id } = useParams();
  return (
    <Elements stripe={stripePromise}>
      {/* {Tous les composants dans Elements ont accès à Stripe} */}
      <CheckoutForm userToken={userToken} id={id} userInfos={userInfos} />
    </Elements>
  );
};

export default Payment;
