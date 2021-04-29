import React, { useState, useEffect } from "react";
import * as fetch from "node-fetch";
import * as cheerio from "cheerio";

import NewRepoTile from "./newRepoTile.js";

const RepoList = (props) => {
  const [state, setState] = useState({
    repo: [],
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
      const $ = cheerio.load(body);
      console.log(body);
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
          // !repoItem.date.toUpperCase().includes("DATE")

          // repoItem.status !== "sold" &&
          // repoItem.status !== "Sold" &&
          // repoItem.status !== "Sold at Auction" &&
          // repoItem.status !== "Cancelled" &&
          // repoItem.status !== "Sealed Bid Sale" &&
          // repoItem.status !== "SOLD!!!" &&
          // repoItem.status !== "SOLD"
        ) {
          return <NewRepoTile key={i} repoData={repoItem} user={props.user} />;
        }
      } else {
        return <NewRepoTile key={i} repoData={repoItem} user={props.user} />;
      }
    }
  });

  // function allLetter(inputtxt) {
  //   var letters = /^[A-Za-z]+$/;
  //   if (inputtxt.value.match(letters)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  // for(let i = 0; i < repoListItems.length; i++){
  // if(allLetter(repoListItems[i].date ) {

  // }
  // }
  return <div className="list-item">{repoListItems}</div>;
};

export default RepoList;
