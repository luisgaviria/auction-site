import React, { useState, useEffect } from "react";

const NewRepoTile = (props) => {
  const [favorites, setFavorites] = useState(props.favorite);
  const { status, date, address, city, state, link, deposit, logo, id } = props.repoData;

  // Make this button only available of logged in
  // const authenticatedListItems = [
  //   <button onClick={onClickHandle}>
  //     <img
  //       className="favorite-button"
  //       src={
  //         favorites
  //           ? "https://i.postimg.cc/cJ33YSkQ/icons8-heart-64-1.png"
  //           : "https://i.postimg.cc/JnWk52SS/icons8-heart-80.png"
  //       }
  //     />
  //   </button>,
  // ];

  const onClickHandle = async () => {
    // console.log(props.user.id);
    if (favorites) {
      const response = await fetch(`/api/v1/favorite/favoriteRepo/${id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      await props.reloadFavorites();
    } else {
      try {
        const response = await fetch(`/api/v1/favorite/${id}`, {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({
            userId: props.user,
          }),
        });
        await props.reloadFavorites();
      } catch (error) {}
    }
    setFavorites(!favorites);
  };

  return (
    <div className="card">
      <a href={link} className="card-logo">
        <img rel="noopener" src={logo} className="thumb" alt="image of auctioneer website logo" />

        <div className="status">{status ? status : "On Schedule"}</div>
        <div className="date">Date: {date ? date : "no date displayed"}</div>
        <div className="address">Address: {address ? address : "no address displayed"}</div>
        {city ? <div className="address">City: {city ? city : null} </div> : null}
        {city ? <div className="address">State: {state ? state : null} </div> : null}
        <div className="deposit">Deposit: {deposit ? deposit : "not available"}</div>
      </a>

      {props.user ? (
        <button onClick={onClickHandle}>
          <img
            className="favorite-button"
            src={
              favorites
                ? "https://i.postimg.cc/cJ33YSkQ/icons8-heart-64-1.png"
                : "https://i.postimg.cc/JnWk52SS/icons8-heart-80.png"
            }
          />
        </button>
      ) : null}
    </div>
  );
};

export default NewRepoTile;
