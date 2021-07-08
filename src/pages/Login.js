import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser }) => {
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // Extras
  const [visiblePass, setVisiblePass] = useState(false);

  const history = useHistory();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
          "http://localhost:4000/user/login",
          data
        );
        // console.log(response.data);
        const token = response.data.token;
        setUser(token);
        history.push("/");
      } catch (error) {
        console.log(error.response);
        console.log(error.message);
      }
    }
  };

  // JSX
  return (
    <div className="container">
      <div className="row">
        <h2 className="text-center">Se connecter</h2>
      </div>

      <form className="mx-auto" style={{ width: 400 }} onSubmit={handleSubmit}>
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

        <span>{errorMessage}</span>

        <div className="row">
          <button className="btn btn-primary" type="submit">
            Se connecter
          </button>
        </div>

        <div className="row text-center">
          <Link to="./signup">
            <span>Pas encore de compte ? Inscris-toi !</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
