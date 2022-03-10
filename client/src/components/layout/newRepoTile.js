import React, { useState, useEffect } from "react";

const NewRepoTile = (props) => {
  const [favorites, setFavorites] = useState(false);
  const { status, date, address, city, state, link, deposit, logo, id } = props.repoData;

  // const userId = props.user.id;

  const onClickHandle = async () => {
    // console.log(props.user.id);
    setFavorites(true);
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
    } catch (error) {}
  };

  return (
    <div className="card">
      <a href={link}>
        <img rel="noopener" src={logo} className="thumb" alt="image of auctioneer website logo" />

        <div className="status">{status ? status : "On Schedule"}</div>
        <div className="date">Date: {date ? date : "no date displayed"}</div>
        <div className="address">Address: {address ? address : "no address displayed"}</div>
        {city ? <div className="address">City: {city ? city : null} </div> : null}
        {city ? <div className="address">State: {state ? state : null} </div> : null}
        <div className="deposit">Deposit: {deposit ? deposit : "not available"}</div>
      </a>

      <button onClick={onClickHandle}>
        <img
          className="favorite-button"
          src={
            favorites
              ? "https://i.postimg.cc/Y90MNm5m/accept.png"
              : "https://i.postimg.cc/15kK2Gwp/icons8-heart-64.png"
          }
        />
      </button>
    </div>
  );
};

export default NewRepoTile;
