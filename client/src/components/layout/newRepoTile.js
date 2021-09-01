import React from "react";
import { Helmet } from "react-helmet";

const NewRepoTile = (props) => {
  const { status, date, address, city, state, link, deposit, logo, id } = props.repoData;

  // const userId = props.user.id;

  const onClickHandle = async () => {
    // console.log(props.user.id);
    try {
      const response = await fetch(`/api/v1/favorite/${id}`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          userId: props.user.id,
        }),
      });
      console.log(response);
    } catch (error) {}
  };

  return (
    <div key={id} className="card">
      <Helmet>
        <meta name={"address" + id} content={address} />
        <meta name={"date" + id} content={date} />
        <meta name={"deposit" + id} content={deposit} />
        <link rel={"canonical" + id} href={link} />
      </Helmet>
      <a href={link}>
        <img src={logo} className="thumb" alt="image of auctioneer website logo" />

        <div className="status">{status ? status : "On Schedule"}</div>
        <div className="date">Date: {date ? date : "no date displayed"}</div>
        <div className="address">Address: {address ? address : "no address displayed"}</div>
        {city ? <div className="address">City: {city ? city : null} </div> : null}
        {city ? <div className="address">State: {state ? state : null} </div> : null}
        <div className="deposit">Deposit: {deposit ? deposit : "not available"}</div>
      </a>

      {/* <button onClick={onClickHandle}>
        <img className="favorite-button" src="https://i.postimg.cc/15kK2Gwp/icons8-heart-64.png" />
      </button> */}
    </div>
  );
};

export default NewRepoTile;
