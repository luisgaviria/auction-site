import React, { useState, useEffect } from "react";
// import { Button } from "react-bootstrap";

const Favorites = (props) => {
  const [favorites, setFavorites] = useState([]);

  const getFavorites = async () => {
    // console.log(props.user.id);
    // const response = await fetch(`/api/v1/favorites/${props.user.id}`);
    try {
      const id = localStorage.getItem("userId");
      const response = await fetch(`/api/v1/favorite/${id}`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setFavorites(body.favorites);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  const deleteFavorite = async (favoriteId) => {
    try {
      const response = await fetch(`/api/v1/favorite/${favoriteId}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      // const body = await response.json();
      await getFavorites();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="list-item">
      {favorites.map((fav) => {
        let { status, date, address, city, state, link, deposit, logo, id } = fav;
        date = new Date(date).toDateString();
        return (
          <div key={id} className="card">
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
            <div className="delete-button-container">
              <button className="favorite-delete-button" onClick={() => deleteFavorite(id)}>
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Favorites;
