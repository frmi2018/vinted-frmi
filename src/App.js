import "./App.css";
// dependancies
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";
// Google Analytics
import ReactGA from "react-ga";
import RouteChangeTracker from "./components/RouteChangeTracker";
// containers
import Header from "./containers/header/Header";
import Payment from "./containers/Payment";
// components
import Footer from "./components/Footer";
// pages
import Home from "./pages/home/Home";
import Offer from "./pages/offer/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Member from "./pages/Member/Member";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  // user infos
  const [userInfos, setUserInfos] = useState({});
  // Google Analytics
  const TRACKING_ID = "G-VSN23XC1E6"; // YOUR_OWN_TRACKING_ID
  ReactGA.initialize(TRACKING_ID);
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
        <RouteChangeTracker />
        <Switch>
          <Route path="/member/:id">
            <RouteChangeTracker />
            <Member userToken={userToken} userInfos={userInfos} />
          </Route>
          <Route path="/offer/:id">
            <RouteChangeTracker />
            <Offer userToken={userToken} userInfos={userInfos} />
          </Route>
          <Route path="/signup">
            <RouteChangeTracker />
            <Signup
              setUser={setUser}
              userInfos={userInfos}
              setUserInfos={setUserInfos}
            />
          </Route>
          <Route path="/login">
            <RouteChangeTracker />
            <Login
              setUser={setUser}
              userInfos={userInfos}
              setUserInfos={setUserInfos}
            />
          </Route>
          <Route path="/payment/:id">
            <RouteChangeTracker />
            <Payment userToken={userToken} userInfos={userInfos} />
          </Route>
          <Route path="/publish">
            <RouteChangeTracker />
            <Publish userToken={userToken} />
          </Route>
          <Route path="/">
            <RouteChangeTracker />
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
