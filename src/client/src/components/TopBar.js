import React from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  NavDropdown,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SignOutButton from "./authentication/SignOutButton.js";

const TopBar = ({ user }) => {
  const navigate = useNavigate();
  function refreshPage() {
    setTimeout(() => {
      window.location.reload(false);
    }, 100);
  }

  const onClickHandle = (route) => {
    navigate(route);
  };
  const unauthenticatedListItems = [
    <Button key="5" variant="outline-secondary" className="sign-in">
      {/* <Link key="6" to="/login" onClick={refreshPage}>
        Sign In
      </Link> */}
    </Button>,
    <Button key="sign-up" className="sign-up" variant="outline-secondary">
      {/* <Link to="/register" onClick={refreshPage}>
        Sign Up
      </Link> */}
    </Button>,
  ];

  const authenticatedListItems = [
    <li key="sign-out" className="sign-out-button">
      <SignOutButton />
    </li>,
  ];

  return (
    <Navbar
      className="navbar"
      collapseOnSelect
      expand="md"
      bg="light"
      variant="light"
    >
      <Navbar.Brand className="logo-nav-bar">
        <a href="/">
          <img
            alt="icon"
            className="d-inline-block"
            src="https://i.postimg.cc/KYyDL9CX/letters-icon-25.png"
          ></img>
        </a>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="nav-home">
          {/* <Nav.Link className="navbar-brand-text">
              <Link className="navbar-brand-text" to="/">
                Home
              </Link>
            </Nav.Link>  */}
          <Nav.Link
            onClick={() => onClickHandle("/")}
            key="1"
            className="navbar-brand-text"
          >
            {/* <Link className="navbar-brand-text" to="/"> */}
            Home
          </Nav.Link>

          <Nav.Link
            onClick={() => onClickHandle("/favorites")}
            key="2"
            className="navbar-brand-text"
          >
            {/* <Link className="navbar-brand-text" to="/favorites" onClick={onClickHandle}> */}
            Favorites
          </Nav.Link>
          <Nav.Link
            onClick={() => onClickHandle("/about")}
            key="3"
            className="navbar-brand-text"
          >
            {/* <Link className="navbar-brand-text" to="/about"> */}
            About Us
          </Nav.Link>
          {
            //   localStorage.getItem("token") ?           <Nav.Link href="/profile" key="4" className="navbar-brand-text">
            //   {/* <Link className="navbar-brand-text" to="/about"> */}
            //   Profile
            // </Nav.Link> : null
          }
        </Nav>

        <Nav.Link key="4" className="">
          {localStorage.getItem("token")
            ? authenticatedListItems
            : unauthenticatedListItems}
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopBar;
