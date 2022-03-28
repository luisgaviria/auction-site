import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
// import { withRouter } from "react-router-dom";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";

import RegistrationForm from "./registration/RegistrationForm";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import SignInForm from "./authentication/SignInForm";
import UserProfile from "./layout/UserProfile.js";

// import ScrollToTop from "./layout/ScrollToTop.js";
// import NewMap from "./layout/newMap";
// const NewMap = lazy(() => import("./layout/NewMap"));
const TopBar = lazy(() => import("./layout/TopBar"));
const Header = lazy(() => import("./layout/Header"));
const AboutUs = lazy(() => import("./layout/AboutUs"));
const RepoList = lazy(() => import("../components/layout/newRepo"));
const Favorites = lazy(() => import("./layout/Favorites"));

import ReactGA from "react-ga";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    ReactGA.initialize("G-Y1T5Q3760Z");
    ReactGA.pageview(window.location.pathname + window.location.search);
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
        localStorage.setItem("userId", user.id);
      })
      .catch(() => {
        setCurrentUser(null);
      });
  }, []);
  return (
    <Suspense fallback={<div className="loader">Loading...</div>}>
      <Router>
        {/* <ScrollToTop /> */}
        <TopBar user={currentUser} />
        <Header user={currentUser} />
        <Switch>
          <Route exact path="/">
            <RepoList user={currentUser} />
          </Route>
          <Route exact path="/favorites">
            <Favorites user={currentUser} />
          </Route>
          {/* <Route exact path="/map" component={NewMap}>
            <NewMap user={currentUser} />
          </Route> */}
          <Route exact path="/about" component={AboutUs}>
            <AboutUs user={currentUser} />
          </Route>
          <Route exact path="/users/new" component={RegistrationForm} />
          <Route exact path="/user-sessions/new" component={SignInForm} />
          <Route exact path="/users/new" component={RegistrationForm} />
          <Route exact path="/user-sessions/new" component={SignInForm} />
          <AuthenticatedRoute exact path="/profile" component={UserProfile} user={currentUser} />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default hot(App);
