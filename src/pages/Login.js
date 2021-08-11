import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser, setUserInfos }) => {
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // Extras
  const [visiblePass, setVisiblePass] = useState(false);

  const history = useHistory();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage(null);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // vérifier les champs de saisie
    if (email === "") {
      setErrorMessage("Entrer un email");
    } else if (password === "") {
      setErrorMessage("Entrer un mot de pass");
    } else {
      // préparer les données
      const data = {};
      data.email = email;
      data.password = password;
      // Envoyer au serveur
      try {
        const response = await axios.post(
          "https://vinted-frmi-api.herokuapp.com/user/login",
          data
        );
        const token = response.data.token;
        // enregistrer le token
        setUser(token);
        // informer l'utilisateur qu'il est connecté
        alert(`Bienvenue ${response.data.account.username}, bonne visite.`);
        // sauvegarde des infos utilisateur
        setUserInfos({
          account: response.data.account,
          id: response.data._id,
        });
        // retour page home
        history.push("/");
      } catch (error) {
        setErrorMessage(error.response.data.message);
        console.log(error.response.data.message);
      }
    }
  };

  // JSX
  return (
    <div className="container p-2 bg-light">
      <form className="form-control mx-auto" onSubmit={handleSubmit}>
        <h2 className="text-center">Se connecter</h2>
        <input
          className="form-control mb-2"
          type="email"
          placeholder="Adresse email"
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
            <span className="input-group-text">
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

        <span className="text-danger">{errorMessage}</span>
        <div className="text-center">
          <button className="btn btn-primary" type="submit">
            Se connecter
          </button>
        </div>
        <div className="text-center">
          <Link to="./signup">
            <span>Pas encore de compte ? Inscris-toi !</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
