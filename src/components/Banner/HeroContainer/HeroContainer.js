import "./heroContainer.css";
// dependancies
import { useHistory } from "react-router-dom";

const HeroContainer = () => {
  const history = useHistory();
  return (
    <div className="d-flex justify-content-around align-items-center h-100 my-css">
      <div className="my-css2">
        <span>Prêts à faire du tri dans vos placards ?</span>
        <button
          className="btn btn-primary m-2"
          type="button"
          onClick={() => {
            history.push("/publish");
          }}
        >
          Vends maintenant
        </button>
        <a href="/">
          <span className="text-link">Découvrir comment ça marche</span>
        </a>
      </div>
    </div>
  );
};
export default HeroContainer;
