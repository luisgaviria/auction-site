import React, { useState, useEffect } from "react";
// import { MemoizedMap } from "./Map";
import { Helmet } from "react-helmet";
import NewRepoList from "./newRepoList";
import ScrollToTop from "./ScrollToTop";
import axios from "axios"; 
import {url} from "../../url";
import { MemoizedMap } from "../map/Map";


import Spinner from "react-bootstrap/Spinner";
// import footage from "../layout/video/footage.mp4";

const NewRepoTile = React.lazy(() => import("./newRepoTile.js"));

const NewRepo = (props) => {
  const [state, setState] = useState({
    repo: [],
    addresses: [],
    favorites: [],
  });

  
 const fetchData = async()=>{
    try {
      const token = localStorage.getItem("token");
        const response1 = await axios.get(url+"/api/v1/crawl",{
          headers: {
            "Authorization": "Bearer "+token,
            "Content-Type": "application/json"
          }
        });

  
        // console.log(response1.body);
        const body1 = response1.data;
  
        const response2 = await axios.get(url+`/api/v1/favorite/`,{
          headers: {
            "Authorization": "Bearer "+token,
            "Content-Type": "application/json"
          }
        });
        const body2 =  response2.data;
        console.log(body2.favorites);
        // console.log(body2);
        setState((prevState) => {
          return { ...prevState, 
            repo: body1.allAuctions,
            favorites: body2.favorites
            
            // favorites: body2.favorites
           };
        });
      } catch (err) {
        console.log(err);
        // console.error(`Error in fetch: ${err.message}`);
      }
 };

  const getRepo = async () => {
    try {
      const response = await axios.get(url+"/api/v1/crawl",{
          headers: {
              "Content-Type": "application/json"
          }
      });
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }

      // console.log(response.body);
      const body = await response.json();

      setState((prevState) => {
        return { ...prevState, repo: body.allAuctions };
      });
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  const getFavorites = async () => {
    // const id = localStorage.getItem("userId");
    // console.log(id);
    const response = await axios.get(url+`/api/v1/favorite`, {
      headers:{
        "Content-Type": "application/json",
        "Authorization": "Bearer "+localStorage.getItem("token")
      }
    });
    const body = response.data;

    setState((prevState) => {
      return { ...prevState, favorites: body.favorites };
    });
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

//   console.log("This is props:", props);
//   console.log("This is state:", state.repo);

  const refreshDatabaseHandleClickButton = async () => {
    await axios.get(url+"/api/v1/crawl/scrap",{
      headers:{
        "Authorization": "Bearer "+localStorage.getItem("token"),
        "Content-Type": "application/json"
      }
    });
    
    // await fetch("/api/v1/crawl/scrap");
  };

  return (
    <div key="1">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="Auction Website" />
        <title>Auction and Company</title>
      </Helmet>
      {props.user == null ? (
        <>
          {/* <video src="./footage.mp4" autoPlay loop muted type={"video/mp4"}></video> */}
          <br></br>
          <div className="map">
            {/* <MemoizedMap alt="map, centered in the Mass area, markers displayed on each auction location." /> */}
          </div>
        </>
      ) : null}

      {localStorage.getItem('token') ? (
        <div className="button-container">
          <a className="button large secondary " onClick={refreshDatabaseHandleClickButton}>
            Refresh Auctions
          </a>
        </div>
      ) : null}

        <>
          <div className="map">
            <MemoizedMap alt="map, centered in the Mass area, markers displayed on each auction location." />
          </div>
          <div className="list-item">
            <Helmet>
              <title>Auction & Co.</title>
              <meta name="description" content={state.repo.address} />
              <link rel="canonical" href="/" />
            </Helmet>
            <>
              <ScrollToTop />
            </>
            <NewRepoList
              getFavorites={getFavorites}
              repo={state.repo}
              favorites={state.favorites}
              user={localStorage.getItem("userId")}
            />
          </div>
        </>
    </div>
  );
};

export default NewRepo;
