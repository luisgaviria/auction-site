import React, { useState, useEffect } from "react";
import axios from "axios";
import {url} from "../../url";
import { Helmet } from "react-helmet";

const NewRepoTile = (props) => {
  const [favorites, setFavorites] = useState(props.favorite);
  let { status, date, address, city, state, link, deposit, logo, id } = props.repoData;
  date = new Date(date).toDateString();
  if (deposit.length > 48) {
    deposit = `${deposit.substring(0, 48)}...`;
  }

  const onClickHandle = async () => {
    // console.log(props.user.id);
    if (favorites) {
      const response = await axios.delete(url+`/api/v1/favorite/favoriteRepo/${id}`,{
        headers:{
          "Content-Type": "application/json",
          "Authorization": "Bearer "+localStorage.getItem("token")
        }
      })
      // const response = await fetch(`/api/v1/favorite/favoriteRepo/${id}`, {
      //   method: "DELETE",
      //   headers: new Headers({
      //     "Content-Type": "application/json",
      //   }),
      // });
      await props.reloadFavorites();
    } else {
      try{
        const response = await axios.post(url+`/api/v1/favorite/${id}`,{

        },{
          headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer "+localStorage.getItem("token")
          }
        });
        await props.reloadFavorites();

      }
      catch(err){
        console.log(err);
      }
      // try {
      //   const response = await fetch(`/api/v1/favorite/${id}`, {
      //     method: "POST",
      //     headers: new Headers({
      //       "Content-Type": "application/json",
      //     }),
      //     body: JSON.stringify({
      //       userId: props.user,
      //     }),
      //   });
      //   await props.reloadFavorites();
      // } catch (error) {}
    // }
  }
    setFavorites(!favorites);
  };

  return (
    <div className="card">
      <Helmet>
        <meta name={`logoTile${id}`} content={logo} />
        <meta name={`addressTile${id}`} content={address ? address : "no address displayed"}/>
        <meta name={`statusTile${id}`} content={status ? status : "On Schedule"}/>
        <meta name={`dateTile${id}`} content={date ? date : "no date displayed"}/>
        <meta name={`cityTile${id}`} content={city ? city : null}/>
        <meta name={`stateTile${id}`} content={state ? state : null}/>
        <meta name={`depositTile${id}`} content={deposit ? deposit : "not available"}/>
      </Helmet>
      <a href={link} target="blank" className="card-logo">
        <img rel="noopener" src={logo} className="thumb" alt="image of auctioneer website logo" />
        <div className="status">{status ? status : "On Schedule"}</div>
        <div className="date">Date: {date ? date : "no date displayed"}</div>
        <div className="address">Address: {address ? address : "no address displayed"}</div>
        {city ? <div className="address">City: {city ? city : null} </div> : null}
        {city ? <div className="address">State: {state ? state : null} </div> : null}
        <div className="deposit">Deposit: {deposit ? deposit : "not available"}</div>
      </a>

      {localStorage.getItem("token") ? (
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