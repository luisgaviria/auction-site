import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
// import Spinner from "react-bootstrap/Spinner";

const Header = (props) => {
  [
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark",
  ].map((variant, idx) => (
    <Alert key={idx} variant={variant}>
      This is a {variant} alert with{" "}
      <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you
      like.
    </Alert>
  ));

  return (
    <>
      <h1 className="heading-primary">Auction & Co.</h1>
      <div
        className="not-container"
        alt="logo, drawing of people attending auction"
      >
        <img
          alt="logo-of-site"
          className="not-container2"
          src="https://i.postimg.cc/wTjbqjsv/20945153-Convert-Image.jpg"
          style={{ aspectRatio: "1/1" }}
        />
      </div>
      <h2></h2>
      <h3 className="heading-primary-main">
        Bringing you all of the Massachusetts Real Estate auctions in one place
        so you can focus on buying.
      </h3>
    </>
  );
};

export default Header;
