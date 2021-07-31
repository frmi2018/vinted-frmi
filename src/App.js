import "./App.css";
// dependancies
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";
// containers
import Header from "./containers/Header";
import Payment from "./containers/Payment";
// components
import Footer from "./components/Footer";
// pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  // user infos
  const [userInfos, setUserInfos] = useState({});
  // filters
  const [search, setSearch] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(50000);
  const [sortFilter, setSortFilter] = useState("price-asc");

  const setUser = (userToken) => {
    if (userToken) {
      Cookies.set("userToken", userToken, { expires: 1 });
      setUserToken(userToken);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
      setUserInfos({});
    }
  };

  return (
    <div className="container">
      <Router>
        <Header
          userToken={userToken}
          setUser={setUser}
          search={search}
          setSearch={setSearch}
          priceMin={priceMin}
          setPriceMin={setPriceMin}
          priceMax={priceMax}
          setPriceMax={setPriceMax}
          sortFilter={sortFilter}
          setSortFilter={setSortFilter}
          userInfos={userInfos}
          setUserInfos={setUserInfos}
        />
        <Switch>
          <Route path="/offer/:id">
            <Offer userToken={userToken} userInfos={userInfos} />
          </Route>
          <Route path="/signup">
            <Signup
              setUser={setUser}
              userInfos={userInfos}
              setUserInfos={setUserInfos}
            />
          </Route>
          <Route path="/login">
            <Login
              setUser={setUser}
              userInfos={userInfos}
              setUserInfos={setUserInfos}
            />
          </Route>
          <Route path="/payment/:id">
            <Payment userToken={userToken} userInfos={userInfos} />
          </Route>
          <Route path="/publish">
            <Publish userToken={userToken} />
          </Route>
          <Route path="/">
            <Home
              search={search}
              priceMin={priceMin}
              priceMax={priceMax}
              sortFilter={sortFilter}
            />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
