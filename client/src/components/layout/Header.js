import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Header = () => {
  return (
    <>
      <h1>Auction & Co.</h1>

      <React.Suspense
        fallback={
          <Spinner animation="border" role="status">
            <span className="visually-hidden"></span>
          </Spinner>
        }
      >
        <div className="not-container" alt="logo, drawing of people attending auction">
          <img
            alt="logo-of-site"
            className="not-container2"
            src="https://i.postimg.cc/wTjbqjsv/20945153-Convert-Image.jpg"
          />
        </div>
      </React.Suspense>

      <h3>
        Bringing you all of the Massachusetts Real Estate auctions in one place so you can focus on
        buying.
      </h3>
    </>
  );
};

export default Header;
