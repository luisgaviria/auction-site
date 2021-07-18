import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, NavDropdown, Button } from "react-bootstrap";

import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const history = useHistory();
  const onClickHandle = () => {
    history.push("/favorites");
  };
  const unauthenticatedListItems = [
    <Button variant="outline-secondary" className="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </Button>,
    // <li key="sign-in" className="button" id="sign-out">
    //   <Link to="/user-sessions/new">Sign In</Link>
    // </li>,
    // <li key="sign-up" className="button" id="sign-out">
    //   <Link to="/users/new" className="button">
    //     Sign Up
    //   </Link>
    // </li>,
    <Button className="sign-up" variant="outline-secondary">
      <Link to="/users/new">Sign Up</Link>
    </Button>,
  ];

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
    <header>
      <Navbar className="navbar" collapseOnSelect expand="md" bg="light" variant="light">
        <Navbar.Brand>
          <a href="http://www.urabatv.com" className="navbar-brand">
            <img
              className="d-inline-block"
              src="https://i.postimg.cc/gcw0FY8B/circle-cropped-4-1.png"
            ></img>
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {/* <Nav.Link className="navbar-brand-text">
              <Link className="navbar-brand-text" to="/">
                Home
              </Link>
            </Nav.Link>  */}
            <Nav.Link className="navbar-brand-text">
              <Link className="navbar-brand-text" to="/">
                Home
              </Link>
            </Nav.Link>

            <Nav.Link className="navbar-brand-text">
              <Link className="navbar-brand-text" to="/favorites">
                Favorites
              </Link>
            </Nav.Link>
            <Nav.Link className="navbar-brand-text">
              <Link className="navbar-brand-text" to="/about">
                About Us
              </Link>
            </Nav.Link>
          </Nav>

          <Nav.Link className="ml-auto">
            {user ? authenticatedListItems : unauthenticatedListItems}
          </Nav.Link>
        </Navbar.Collapse>
      </Navbar>
    </header>

    // return (
    //   <div className="main-header">
    //     <div className="top-bar-left">
    //       <ul className="menu">
    //         <li>
    //           <a type="button" class="button hollow secondary large color black" href="/">
    //             Home
    //           </a>
    //         </li>
    //         <li>
    //           <button
    //             type="button"
    //             class="button hollow secondary large color black"
    //             onClick={onClickHandle}
    //           >
    //             Favorites
    //           </button>
    //         </li>
    //       </ul>
    //     </div>
    //     <div className="top-bar-right">
    //       <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
    //     </div>
    //   </div>
  );
};

export default TopBar;
