import React, { useEffect, useState } from "react";
import { Redirect, Route, useParams, withRouter } from "react-router-dom";
import translateServerErrors from "../../services/translateServerErrors.js";

const AuctionShow = () => {
  const [errors, setErrors] = useState({});
  const [auction, setAuction] = useState({
    status: "",
    date: "",
    address: "",
    city: "",
    state: "",
    deposit: "",
    logo: "",
    link: "",
    favorite: null,
  });

  const getAuction = async () => {
    const auctionId = props.match.params.id;
    try {
      const response = await fetch(``);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setAuction(body.auction);
    } catch (error) {
      console.error(`Err in fetch: ${error.message}`);
    }
  };
};
