import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../url";
import { Helmet } from "react-helmet";

const NewRepoTile = (props) => {
  const [favorites, setFavorites] = useState(props.favorite);
  let { status, date, address, city, state, link, deposit, logo, id } =
    props.repoData;
  date = new Date(date).toDateString();
  if (deposit.length > 48) {
    deposit = `${deposit.substring(0, 48)}...`;
  }

  const onClickHandle = async () => {
    // console.log(props.user.id);
    if (favorites) {
      const response = await axios.delete(
        url + `/api/v1/favorite/favoriteRepo/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      })

      await props.reloadFavorites();
    } else {
      try {
        const response = await axios.post(
          url + `/api/v1/favorite/${id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        await props.reloadFavorites();
      } catch (err) {
        console.log(err);
      }

  }
    setFavorites(!favorites);
  };

  return (
    <div className="card">
      <Helmet>
        <meta name="title" content="" />
        <meta name="description" content="" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateListing",
            name: `${id}`,
            image: `${logo ? logo : "No Image available"}`,
            address: {
              "@type": "PostalAddress",
              streetAddress: `${address ? address : "No address available"}`,
              addressLocality: `${city ? city : "No city available"} `,
              addressRegion: `${state ? state : "No state available"}`,
            },
            propertyID: `${id}`,
            propertyStatus: `${status ? status : "No status available"}`,
            availabilityStarts: `${date ? date : "No date available"}`,
            deposit: `${deposit ? deposit : "No deposit info"}`,
            url: `${link ? link : "No link available"}`,
          })}
        </script>
      </Helmet>
      <a href={props.repoData?.details ? "/details" : link} target="blank" className="card-logo">
        <img rel="noopener" src={logo} className="thumb" alt="image of auctioneer website logo" />
        <div className="status">{status ? status : "On Schedule"}</div>
        <div className="date">Date: {date ? date : "no date displayed"}</div>
        <div className="address">
          Address: {address ? address : "no address displayed"}
        </div>
        {city ? (
          <div className="address">City: {city ? city : null} </div>
        ) : null}
        {city ? (
          <div className="address">State: {state ? state : null} </div>
        ) : null}
        <div className="deposit">
          Deposit: {deposit ? deposit : "not available"}
        </div>
      </a>

      {localStorage.getItem("token") ? (
        <button
          onClick={onClickHandle}
          name={`favourite_heart_button_${id}`}
          alt="favourite_button"
        >
          <img
            className="favorite-button"
            src={
              favorites
                ? "https://i.postimg.cc/cJ33YSkQ/icons8-heart-64-1.png"
                : "https://i.postimg.cc/JnWk52SS/icons8-heart-80.png"
            }
            alt="favourite-button-image"
          />
        </button>
      ) : null}
      {props.repoData.details ? <p>Click to see more details!</p> : null}
    </div>
  );
};

export default NewRepoTile;
