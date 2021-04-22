import React, { useState, useEffect } from "react";
import * as fetch from "node-fetch";
import * as cheerio from "cheerio";

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

  let icon = "https://i.postimg.cc/dQHgDG8P/Screen-Shot-2021-03-07-at-10-39-2.png";

  useEffect(() => {
    getRepo();
  }, []);

  const repoListItems = state.repo.map((repoItem, i) => {
    if (repoItem.status && repoItem.date) {
      if (
        !repoItem.status.toUpperCase().includes("SOLD") &&
        !repoItem.date.toUpperCase().includes("SOLD") &&
        !repoItem.status.toUpperCase().includes("CANCEL")

        // repoItem.status !== "sold" &&
        // repoItem.status !== "Sold" &&
        // repoItem.status !== "Sold at Auction" &&
        // repoItem.status !== "Cancelled" &&
        // repoItem.status !== "Sealed Bid Sale" &&
        // repoItem.status !== "SOLD!!!" &&
        // repoItem.status !== "SOLD"
      ) {
        return (
          <div key={i} className="card">
            <img
              src="https://photos.skyline.com/uploads/block/floated_image_block_data/image/1728/floated_shutterstock_145605907.gif"
              className="thumb"
            />
            <div className="infos">
              {/* <div className="serial">{repoItem.serial_number}</div> */}
              <div className="status">
                Status: {repoItem.status ? repoItem.status : "no status displayed"}
              </div>
              <div className="date">
                Date: {repoItem.date ? repoItem.date : "no date displayed"}
              </div>
              <div className="address">
                {repoItem.address ? repoItem.address : "no address displayed"}
              </div>
              <div className="address">{repoItem.city || ""} </div>
              <div className="address">{repoItem.state || ""}</div>
            </div>
          </div>
        );
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
  return (
    <div className="list-item">
      {repoListItems.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      })}
    </div>
  );
};

export default RepoList;
