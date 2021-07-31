import React from "react";

import warningIcon from "../assets/icons/warning-icon.png";

function Footer() {
  return (
    <footer
      className="container border-top text-center p-2"
      style={{ backgroundColor: "#f7f2ab" }}
    >
      <div>
        <img src={warningIcon} alt="warning Icon" width="50" />
      </div>

      <span>
        Ce site est inspiré du site original{" "}
        <a href="https://www.vinted.fr/">
          Vinted.
          <br />
        </a>{" "}
        Il est développé par <a href="https://github.com/frmi2018/">
          FRMI
        </a>{" "}
        dans le cadre de son apprentissage de{" "}
        <a href="https://fr.reactjs.org/">React</a> depuis 2021.
        <br />
        Vous pouvez le tester mais n'entrez pas vos informations bancaire dans
        la page de paiement ! Merci.
      </span>

      <hr />

      <span>
        This site is inspired by the original site{" "}
        <a href="https://www.vinted.fr/">
          Vinted.
          <br />
        </a>
        It has been developed by <a href="https://github.com/frmi2018/">
          FRMI
        </a>{" "}
        as part of its <a href="https://fr.reactjs.org/">React</a> training
        since 2021.
        <br />
        You can test it but don't enter your banking informations in the payment
        page! Thank you.
      </span>
    </footer>
  );
}

export default Footer;
