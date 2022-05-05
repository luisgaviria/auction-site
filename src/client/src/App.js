import logo from "./logo.svg";
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/scss/main.scss";

import ReactGA from "react-ga";

const TopBar = lazy(() => import("./components/TopBar.js"));
const Header = lazy(() => import("./components/Header.js"));
const NewRepo = lazy(() => import("./components/repo/newRepo"));
const AboutUs = lazy(() => import("./components/aboutUs/AboutUs.js"));
const SignUp = lazy(() => import("./components/authentication/SignUp.js"));
const SignIn = lazy(() => import("./components/authentication/SignIn.js"));
const Favorites = lazy(() => import("./components/favorites/Favorites.js"));
const Profile = lazy(() => import("./components/profile/Profile.js"));

function App() {
  useEffect(() => {
    ReactGA.initialize("G-T4NF3MR6N7");
    ReactGA.pageview(window.location.pathname + window.location.search);
    // getCurrentUser()
    //   .then((user) => {
    //     setCurrentUser(user);
    //     localStorage.setItem("userId", user.id);
    //   })
    //   .catch(() => {
    //     setCurrentUser(null);
    //   });
  }, []);
  return (
    <Suspense fallback={<div className='loader'>Loading...</div>}>
      <BrowserRouter>
        <TopBar />
        <Header />
        <Routes>
          <Route exact path='/' element={<NewRepo />} />
          <Route exact path='/about' element={<AboutUs />} />
          <Route exact path='/register' element={<SignUp />} />
          <Route exact path='/login' element={<SignIn />} />
          <Route exact path='/favorites' element={<Favorites />} />
          <Route exact path='/profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
