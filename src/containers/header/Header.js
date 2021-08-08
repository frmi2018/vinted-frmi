import "./header.css";
import logoVinted from "./assets/images/logo_vinted.png";
// dependancies
import React from "react";
import { Link, useLocation } from "react-router-dom";

// components
import AvatarLetter from "../../components/Avatars/AvatarLetter/AvatarLetter";
import AvatarPicture from "../../components/Avatars/AvatarPicture/AvatarPicture";
import Filters from "../Filters/Filters";

const Header = (props) => {
  const {
    userToken,
    setUser,
    setSearch,
    priceMin,
    setPriceMin,
    priceMax,
    setPriceMax,
    sortFilter,
    setSortFilter,
    userInfos,
    setUserInfos,
  } = props;

  let location = useLocation();

  return (
    <header className="container p-2 bg-light border-bottom">
      <nav className="navbar d-flex flex-nowrap">
        {/* Logo*/}
        <div>
          <Link to="/" className="navbar-brand nav-link">
            <img src={logoVinted} alt="logo-vinted" width="100" />
          </Link>
        </div>
        {/* buttons */}

        <div className="d-flex align-items-center flex-nowrap">
          {userToken && Object.keys(userInfos).length !== 0 ? (
            <button
              className="btn btn-outline-danger"
              type="button"
              onClick={() => {
                setUser(null);
                setUserInfos({});
              }}
            >
              Se déconnecter
            </button>
          ) : (
            <div className="border border-outline-primary">
              <Link to="/signup" className="mx-2">
                S'inscrire
              </Link>
              |
              <Link to="/login" className="mx-2">
                Se connecter
              </Link>
            </div>
          )}
          <div>
            <Link to="/publish" className="nav-link">
              <button className="btn btn-primary" type="button">
                Vends maintenant
              </button>
            </Link>
          </div>
        </div>
        {/* Avatar */}
        {Object.keys(userInfos).length !== 0 &&
          (userInfos.account.avatar !== "" ? (
            <Link to={`/member/${userInfos.id}`} className="mx-2">
              <AvatarPicture userInfos={userInfos} />
            </Link>
          ) : (
            <Link to={`/member/${userInfos.id}`} className="mx-2">
              <AvatarLetter userInfos={userInfos} />
            </Link>
          ))}
      </nav>
      {location.pathname === "/" && (
        <Filters
          setSearch={setSearch}
          priceMin={priceMin}
          setPriceMin={setPriceMin}
          priceMax={priceMax}
          setPriceMax={setPriceMax}
          sortFilter={sortFilter}
          setSortFilter={setSortFilter}
        />
      )}
    </header>
  );
};

export default Header;
