import React, { useState, useEffect } from "react";
import axios from "axios";
import {url} from "../../url.js"; 
import {FavoriteMap} from "../map/FavoriteMap.js";
// import { Button } from "react-bootstrap";

const Favorites = (props) => {
  const [favorites, setFavorites] = useState([]);

  const getFavorites = async () => {
      const token = localStorage.getItem("token");
    try{
        const response = await axios.get(url+`/api/v1/favorite`,{
            headers: {
                "Content-Type": "application/json", 
                "Authorization": "Bearer "+token
            }
        }); 
        const body = response.data;
        // console.log(body.favorites); 
        setFavorites(body.favorites);
    }
    catch(err){
        console.log(err);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  const deleteFavorite = async (favoriteId) => {
      try{ 
        const response = await axios.delete(url+`/api/v1/favorite/${favoriteId}`,{
            headers: {
                "Content-Type":"application/json", 
                "Authorization": "Bearer "+localStorage.getItem("token") 
            }
        });

        await getFavorites();
      }
      catch(err){
          console.log(err);
      }
    // try {
    //   const response = await fetch(`/api/v1/favorite/${favoriteId}`, {
    //     method: "DELETE",
    //     headers: new Headers({
    //       "Content-Type": "application/json",
    //     }),
    //   });
    //   if (!response.ok) {
    //     const errorMessage = `${response.status} (${response.statusText})`;
    //     const error = new Error(errorMessage);
    //     throw error;
    //   }
    //   // const body = await response.json();
    //   await getFavorites();
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
      <>
        <div className="map">
            <FavoriteMap alt="map, centered in the Mass area, markers displayed on each auction location." />
          </div>
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
    </>
  );
};
export default Favorites;
