import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";

import RegistrationForm from "./registration/RegistrationForm";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute";
import SignInForm from "./authentication/SignInForm";
import UserProfile from "./layout/UserProfile.js";

import TopBar from "./layout/TopBar";
import Header from "./layout/Header";
import NewMap from "./layout/newMap";

import RepoList from "../components/layout/newRepo";

import Favorites from "../components/layout/Favorites.js";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
        console.log(user);
      })
      .catch(() => {
        setCurrentUser(null);
      });
  }, []);
  return (
    <Router>
      <TopBar user={currentUser} />
      <Header />
      <Switch>
        <Route exact path="/">
          <RepoList user={currentUser} />
        </Route>
        <Route exact path="/favorites">
          <Favorites user={currentUser} />
        </Route>
        <Route exact path="/map" component={NewMap}>
          <NewMap user={currentUser} />
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <AuthenticatedRoute exact path="/profile" component={UserProfile} user={currentUser} />
      </Switch>
    </Router>
  );
};

export default hot(App);
