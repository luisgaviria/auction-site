import React, { useState, useEffect } from "react";
// import { MemoizedMap } from "./Map";
import { Helmet } from "react-helmet";
import NewRepoList from "./newRepoList";
import ScrollToTop from "./ScrollToTop";
import axios from "axios";
import { url } from "../../url";
import { MemoizedMap } from "../map/Map";
import Pagination from "react-bootstrap/Pagination";
import { Spinner } from "react-bootstrap";

// import Spinner from "react-bootstrap/Spinner";
// import footage from "../layout/video/footage.mp4";

const NewRepoTile = React.lazy(() => import("./newRepoTile.js"));

const NewRepo = (props) => {
  const [state, setState] = useState({
    repo: [],
    addresses: [],
    favorites: [],
    page: 1,
    limit: 48,
    pages: 0,
    loading: true,
  });

  const onClickPage = (page) => {
    setState({
      ...state,
      repo: [],
      favorites: [],
      page: page,
      loading: true
    });
  };

  const ReturnPages = () => {
    const array = [];
    array.push(
      <Pagination.Item
        onClick={() => {
          if (state.page <= state.pages && state.page != 1) {
            const page = state.page - 1;
            onClickPage(page);
          }
        }}
      >
        {"<"}
      </Pagination.Item>
    );
    for (let i = 1; i <= state.pages; i++) {
      if (i === state.page) {
        array.push(
          <Pagination.Item
            style={{ listStyleType: "none", display: "flex" }}
            onClick={() => onClickPage(i)}
            active={i === state.page}
            activeLabel=""
          >
            {i}
          </Pagination.Item>
        );
      } else {
        array.push(
          <Pagination.Item
            active={i === state.page}
            onClick={() => onClickPage(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    }
    array.push(
      <Pagination.Item
        onClick={() => {
          if (state.pages > state.page) {
            const page = state.page + 1;
            onClickPage(page);
          }
        }}
      >
        {">"}
      </Pagination.Item>
    );
    return array;
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response1 = await axios.get(
        url + `/api/v1/crawl?page=${state.page}&limit=${state.limit}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      // console.log(response1.body);
      const body1 = response1.data;

      const response2 = await axios.get(url + `/api/v1/favorite/`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const body2 = response2.data;
      // console.log(body2.favorites);
      // console.log(body2);
      setState((prevState) => {
        return {
          ...prevState,
          repo: body1.allAuctions,
          favorites: body2.favorites,

          // favorites: body2.favorites
        };
      });
    } catch (err) {
      console.log(err);
      // console.error(`Error in fetch: ${err.message}`);
    }
  };

  const getFavorites = async () => {
    // const id = localStorage.getItem("userId");
    // console.log(id);
    const response = await axios.get(url + `/api/v1/favorite`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const body = response.data;

    setState((prevState) => {
      return { ...prevState, favorites: body.favorites };
    });
  };

  useEffect(() => {
    // fetchData();
    return () => {};
  }, []);

  useEffect(() => {
    const getPagedData = async () => {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        url + `/api/v1/crawl?page=${state.page}&limit=${state.limit}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(data.allAuctions);

      if (data.allAuctions.length) {
        setState({
          ...state,
          repo: data.allAuctions,
          limit: data.limit,
          pages: data.pages,
          loading: false,
        });
      }
    };
    getPagedData();
  }, [state.page]);

  //   console.log("This is props:", props);
  //   console.log("This is state:", state.repo);

  const refreshDatabaseHandleClickButton = async () => {
    await axios.get(url + "/api/v1/crawl/scrap", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    // await fetch("/api/v1/crawl/scrap");
  };

  return (
    <div key="1">
      <Helmet>
        <title>
          Massachusetts Real Estate Auction Searches with Auction & Company
        </title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Massachusetts Real Estate Auctions Made Simple. Join Auction & Company to Stay Ahead of Auction Dates and Boost Your Real Estate Investments."
        />
      </Helmet>

      {localStorage.getItem("token") ? (
        <div className="button-container">
          <a
            className="button large secondary "
            onClick={refreshDatabaseHandleClickButton}
          >
            Refresh Auctions
          </a>
        </div>
      ) : null}

      <>
        <div className="map">
          <MemoizedMap alt="map, centered in the Mass area, markers displayed on each auction location." />
        </div>

          {
            state.loading ? <div style={{textAlign: 'center'}}><Spinner animation="border" role="status"/></div> :           
       <>
               <Pagination
          between={4}
          size="lg"
          style={{
            listStyle: "none",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <ReturnPages />
        </Pagination>
       <div className="list-item">
            
            <ScrollToTop />
            <NewRepoList
              getFavorites={getFavorites}
              repo={state.repo}
              favorites={state.favorites}
              user={localStorage.getItem("userId")}
            />
        </div>
        </>   
      
          }

      </>
    </div>
  );
};

export default NewRepo;
