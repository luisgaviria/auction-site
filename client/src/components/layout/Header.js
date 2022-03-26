import React from "react";
import Alert from "react-bootstrap/Alert";
// import Spinner from "react-bootstrap/Spinner";

const Header = (props) => {
  ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"].map(
    (variant, idx) => (
      <Alert key={idx} variant={variant}>
        This is a {variant} alert with <Alert.Link href="#">an example link</Alert.Link>. Give it a
        click if you like.
      </Alert>
    )
  );

  return (
    <>
      {props.user == null ? (
        <div className="message-container">
          <h1 className="heading-primary">Auction & Co.</h1>
          <br></br>
          <br></br>
          <Alert variant="success" className="Signup-alert">
            <Alert.Heading className="heading-signup">Welcome to Auction & Company!</Alert.Heading>
            <p>
              This site brings you all of the Massachusetts Real Estate auctions in one place so you
              can focus on buying.
            </p>
            <hr />
            <p className="mb-0">
              Please <a href="/users/new">sign up</a> or <a href="/user-sessions/new">sign in</a> in
              order to access all the available auctions.
            </p>
          </Alert>
          <br></br>
        </div>
      ) : (
        <>
          <h1 className="heading-primary">Auction & Co.</h1>
          <div className="not-container" alt="logo, drawing of people attending auction">
            <img
              alt="logo-of-site"
              className="not-container2"
              src="https://i.postimg.cc/wTjbqjsv/20945153-Convert-Image.jpg"
            />
          </div>
          <h3 className="heading-primary-main">
            Bringing you all of the Massachusetts Real Estate auctions in one place so you can focus
            on buying.
          </h3>
        </>
      )}
    </>
  );
};

export default Header;
