import React, { useState, useEffect } from "react";

const Favorites = (props) => {
  const [favorites, setFavorites] = useState([]);

  const getFavorites = async () => {
    // console.log(props.user.id);
    // const response = await fetch(`/api/v1/favorites/${props.user.id}`);
    const response = await fetch(`/api/v1/favorite/${props.user.id}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });

    const body = await response.json();
    // console.log("body:", body.favorites);
    setFavorites(body.favorites);
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div className="list-item">
      {favorites.map((fav) => {
        const { status, date, address, city, state, link, deposit, logo, id } = fav.auction;

        return (
          <div key={fav.id} className="card">
            <a href={link} target="_blank">
              <img
                src={
                  logo ||
                  "https://photos.skyline.com/uploads/block/floated_image_block_data/image/1728/floated_shutterstock_145605907.gif"
                }
                className="thumb"
              />

              <div className="status">{status ? status : "On Schedule"}</div>
              <div className="date">Date: {date ? date : "no date displayed"}</div>
              <div className="address">Address: {address ? address : null}</div>
              {city ? <div className="address">City: {city ? city : null} </div> : null}
              {city ? <div className="address">State: {state ? state : null} </div> : null}
              <div className="deposit">Deposit: {deposit ? deposit : "not available"}</div>
            </a>
          </div>
        );
      })}
    </div>
  );
};
export default Favorites;
