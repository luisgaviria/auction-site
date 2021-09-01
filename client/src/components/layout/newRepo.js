import React, { useState, useEffect } from "react";
import Map from "./Map";
import { Helmet } from "react-helmet";
const NewRepoTile = React.lazy(() => import("./newRepoTile.js"));

import * as fetch from "node-fetch";

//import Geocode from "react-geocode";
// import NewRepoTile from "./newRepoTile.js";

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

      console.log(response.body);
      const body = await response.json();

      setState({ ...state, repo: body.allAuctions });
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

  const refreshDatabaseHandleClickButton = async () => {
    await fetch("/api/v1/crawl/scrap");
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="Auction Website" />
        <title>Auction and Company</title>
      </Helmet>
      <div className="map">
        <Map alt="map, centered in the Mass area, markers displayed on each auction location." />
      </div>
      <div className="button-container">
        <a className="button large secondary " onClick={refreshDatabaseHandleClickButton}>
          Refresh Auctions
        </a>
      </div>

      <div className="list-item">{repoListItems}</div>
    </>
  );
};

export default RepoList;
