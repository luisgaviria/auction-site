import React, { useState, useEffect } from "react";
import { MemoizedMap } from "./Map";
import { Helmet } from "react-helmet";
import NewRepoList from "./newRepoList";
import Spinner from "react-bootstrap/Spinner";
const NewRepoTile = React.lazy(() => import("./newRepoTile.js"));

import * as fetch from "node-fetch";

//import Geocode from "react-geocode";
// import NewRepoTile from "./newRepoTile.js";

const RepoList = (props) => {
  const [state, setState] = useState({
    repo: [],
    addresses: [],
    favorites: [],
  });

  const fetchData = async () => {
    try {
      const response1 = await fetch("/api/v1/crawl");
      if (!response1.ok) {
        const errorMessage = `${response1.status} (${response1.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }

      // console.log(response1.body);
      const body1 = await response1.json();

      const id = localStorage.getItem("userId");
      const response2 = await fetch(`/api/v1/favorite/${id}`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      const body2 = await response2.json();
      // console.log(body2);
      setState((prevState) => {
        return { ...prevState, repo: body1.allAuctions, favorites: body2.favorites };
      });
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  // const getRepo = async () => {
  //   try {
  //     const response = await fetch("/api/v1/crawl");
  //     if (!response.ok) {
  //       const errorMessage = `${response.status} (${response.statusText})`;
  //       const error = new Error(errorMessage);
  //       throw error;
  //     }

  //     // console.log(response.body);
  //     const body = await response.json();

  //     setState((prevState) => {
  //       return { ...prevState, repo: body.allAuctions };
  //     });
  //   } catch (err) {
  //     console.error(`Error in fetch: ${err.message}`);
  //   }
  // };

  const getFavorites = async () => {
    const id = localStorage.getItem("userId");
    console.log(id);
    const response = await fetch(`/api/v1/favorite/${id}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    const body = await response.json();

    setState((prevState) => {
      return { ...prevState, favorites: body.favorites };
    });
  };

  useEffect(async () => {
    await fetchData();
  }, []);

  // const repoListItems = state.repo.map(async (repoItem, i) => {
  //   // const favorites = await getFavorites();
  //   // console.log(repoItem.id);
  //   let favorite = false;
  //   console.log(repoItem.id, state.favorites);
  //   favorites.map((favorite) => {
  //     console.log(favorite);
  //     if (favorite.id == repoItem.id) {
  //       favorite = true;
  //     }
  //   });

  //   if (repoItem.date) {
  //     if (repoItem.status) {
  //       if (
  //         !repoItem.status.toUpperCase().includes("SOLD") &&
  //         !repoItem.date.toUpperCase().includes("SOLD") &&
  //         !repoItem.status.toUpperCase().includes("CANCEL")
  //       ) {
  //         return (
  //           <React.Suspense key={repoItem.id}>
  //             <NewRepoTile
  //               favorite={favorite}
  //               repoData={repoItem}
  //               reloadFavorites={getFavorites}
  //               user={props.user}
  //             />
  //           </React.Suspense>
  //         );
  //       }
  //     } else {
  //       return (
  //         <React.Suspense
  //           key={repoItem.id}
  //           // fallback={
  //           //   <Spinner animation="border" role="status">
  //           //     <span className="visually-hidden"></span>
  //           //   </Spinner>
  //           // }
  //         >
  //           <NewRepoTile
  //             favorite={favorite}
  //             repoData={repoItem}
  //             reloadFavorites={getFavorites}
  //             user={props.user}
  //           />
  //         </React.Suspense>
  //       );
  //     }
  //   }
  // });

  const refreshDatabaseHandleClickButton = async () => {
    await fetch("/api/v1/crawl/scrap");
  };

  return (
    <div key="1">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="Auction Website" />
        <title>Auction and Company</title>
      </Helmet>
      <div className="map">
        <MemoizedMap alt="map, centered in the Mass area, markers displayed on each auction location." />
      </div>
      <div className="button-container">
        <a className="button large secondary " onClick={refreshDatabaseHandleClickButton}>
          Refresh Auctions
        </a>
      </div>

      {state.favorites ? (
        <div className="list-item">
          <NewRepoList
            getFavorites={getFavorites}
            repo={state.repo}
            favorites={state.favorites}
            user={localStorage.getItem("userId")}
          />
        </div>
      ) : null}
    </div>
  );
};

export default RepoList;
