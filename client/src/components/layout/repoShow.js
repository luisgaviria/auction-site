import React, { useEffect, useState } from "react";
import { Redirect, Route, useParams, withRouter } from "react-router-dom";
import translateServerErrors from "../../services/translateServerErrors.js";

const repoShow = (props) => {
  const [errors, setErrors] = useState({});
  const [repo, setRepo] = useState({
    // author: "",
    // content: "",
    // publishedAt: "",
    // title: "",
    // description: "",
    // url: "",
    // urlToImage: "",
    // rating: "",
    // reviews: [],
    // id: "",
    // averageRating: null,
  });
  const getRepo = async () => {
    let auctionId = undefined;
    if (props.match.params.id) {
      crawlId = props.match.params.id;
    } else {
      crawlId = props.repoData.crawlId;
    }
    try {
      const response = await fetch(`/api/v1/crawl/${crawlId}`);

      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();

      setRepo({
        ...repo,
        auction: body.auction,
      });
    } catch (error) {
      console.error(`Err in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getRepo();
  }, []);
};

export default withRouter(repoShow);
