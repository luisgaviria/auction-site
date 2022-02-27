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
    <Button key="5" variant="outline-secondary" className="sign-in">
      <Link key="6" to="/user-sessions/new">
        Sign In
      </Link>
    </Button>,
    // <li key="sign-in" className="button" id="sign-out">
    //   <Link to="/user-sessions/new">Sign In</Link>
    // </li>,
    // <li key="sign-up" className="button" id="sign-out">
    //   <Link to="/users/new" className="button">
    //     Sign Up
    //   </Link>
    // </li>,
    <Button key="sign-up" className="sign-up" variant="outline-secondary">
      <Link to="/users/new">Sign Up</Link>
    </Button>,
  ];

  const authenticatedListItems = [
    <li key="sign-out" className="sign-out-button">
      <SignOutButton />
    </li>,
  ];

  return (
    <Navbar className="navbar" collapseOnSelect expand="md" bg="light" variant="light">
      <Navbar.Brand className="logo-nav-bar">
        {/* <img
            alt="icon"
            className="d-inline-block"
            src="https://i.postimg.cc/gcw0FY8B/circle-cropped-4-1.png"
          ></img> */}
        A&CO
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="nav-home">
          {/* <Nav.Link className="navbar-brand-text">
              <Link className="navbar-brand-text" to="/">
                Home
              </Link>
            </Nav.Link>  */}
          <Nav.Link key="1" className="navbar-brand-text" href="/">
            {/* <Link className="navbar-brand-text" to="/"> */}
            Home
          </Nav.Link>

          <Nav.Link href="/favorites" key="2" className="navbar-brand-text" onClick={onClickHandle}>
            {/* <Link className="navbar-brand-text" to="/favorites" onClick={onClickHandle}> */}
            Favorites
          </Nav.Link>
          <Nav.Link href="/about" key="3" className="navbar-brand-text">
            {/* <Link className="navbar-brand-text" to="/about"> */}
            About Us
          </Nav.Link>
        </Nav>

        <Nav.Link key="4" className="">
          {user ? authenticatedListItems : unauthenticatedListItems}
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>

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
