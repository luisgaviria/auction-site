import React, { useState, useEffect } from "react";
import Map from "./Map";
import * as fetch from "node-fetch";

import Geocode from "react-geocode";

import NewRepoTile from "./newRepoTile.js";

const RepoList = (props) => {
  const [state, setState] = useState({
    repo: [],
    addresses: [],
  });

  const getRepo = async () => {
    try {
      const response = await fetch("/api/v1/crawl");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();

      console.log(body);
      Geocode.setApiKey("AIzaSyBIa95EK04YAEKm3rg3QN0nbxmRpTRIwk4");
      Geocode.setLanguage("en");
      Geocode.setRegion("us");
      //Geocode.enableDebug();
      const auctions_addresses = [];
      body.allAuctions.map(async (auction) => {
        const response = await Geocode.fromAddress(auction.address);
        const location = response.results[0].geometry.location;
        auctions_addresses.push({
          location,
        });
      });
      console.log(auctions_addresses);
      setState({ ...state, repo: body.allAuctions, addresses: auctions_addresses });
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getRepo();
  }, []);

  const repoListItems = state.repo.map((repoItem, i) => {
    if (repoItem.date) {
      if (repoItem.status) {
        if (
          !repoItem.status.toUpperCase().includes("SOLD") &&
          !repoItem.date.toUpperCase().includes("SOLD") &&
          !repoItem.status.toUpperCase().includes("CANCEL")
        ) {
          return <NewRepoTile key={i} repoData={repoItem} user={props.user} />;
        }
      } else {
        return <NewRepoTile key={i} repoData={repoItem} user={props.user} />;
      }
    }
  });

  return (
    <>
      <div className="map">
        <Map addresses={state.addresses} />
      </div>
      <div className="list-item">{repoListItems}</div>
    </>
  );
};

export default RepoList;
