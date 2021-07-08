import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

const Signup = ({ setUser }) => {
  // state
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // Extras
  const [visiblePass, setVisiblePass] = useState(false);

  const history = useHistory();

  const handleTextChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // vérifier les champs de saisie
    if (username === "") {
      setErrorMessage("Entrer un nom");
    } else {
      if (email === "") {
        setErrorMessage("Entrer un email");
      } else if (password === "") {
        setErrorMessage("Entrer un mot de pass");
      } else if (password !== confirmPassword) {
        setErrorMessage("Vos mots de passe ne sont pas identiques !");
      } else if (password.length < 6) {
        setErrorMessage("minimum 6 caractères pour le password");
      } else {
        // préparer les données
        const data = {};
        data.email = email;
        data.username = username;
        data.password = password;
        // Envoyer au serveur
        try {
          const response = await axios.post(
            "http://localhost:4000/user/signup",
            data
          );
          const token = response.data.token;
          setUser(token);
          history.push("/");
        } catch (error) {
          console.log(error.response.data.message);
        }
      }
    }
  };

  // JSX
  return (
    <div className="container">
      <form
        className="form-control mx-auto"
        style={{ width: 400 }}
        onSubmit={handleSubmit}
      >
        <h2 className="text-center">S'inscrire</h2>
        <input
          className="form-control mb-2"
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={handleTextChange}
        />

        <input
          className="form-control mb-2"
          type="email"
          placeholder="Adresse mail"
          value={email}
          onChange={handleEmailChange}
        />

        <div className="input-group mb-2">
          <input
            className="form-control"
            type={visiblePass === true ? "text" : "password"}
            placeholder="Mot de passe"
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="input-group-append">
            <span class="input-group-text">
              {visiblePass ? (
                <i
                  className="bi bi-eye-slash"
                  onClick={() => {
                    setVisiblePass(false);
                  }}
                />
              ) : (
                <i
                  className="bi bi-eye"
                  onClick={() => {
                    setVisiblePass(true);
                  }}
                />
              )}
            </span>
          </div>
        </div>

        <div className="input-group mb-2">
          <input
            className="form-control"
            type={visiblePass === true ? "text" : "password"}
            placeholder="Confirm mot de passe"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <div className="input-group-append">
            <span class="input-group-text">
              {visiblePass ? (
                <i
                  className="bi bi-eye-slash"
                  onClick={() => {
                    setVisiblePass(false);
                  }}
                />
              ) : (
                <i
                  className="bi bi-eye"
                  onClick={() => {
                    setVisiblePass(true);
                  }}
                />
              )}
            </span>
          </div>
        </div>

        <div className="border border-info mb-2 p-2">
          <div className="d-flex justify-content-center align-items-center">
            <input type="checkbox" className="me-2" />
            <span>S'inscrire à notre newsletter</span>
          </div>

          <p className="text-justify">
            En m'inscrivant, je confirme avoir lu et accepté les Termes &amp;
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>

        <span className="text-danger">{errorMessage}</span>

        <div className="text-center">
          <button className="btn btn-primary" type="submit">
            S'inscrire
          </button>
        </div>
        <div className="text-center">
          <Link to="./login">
            <span>Tu as déjà un compte ? Connecte-toi !</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
