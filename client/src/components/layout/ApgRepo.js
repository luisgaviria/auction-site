import React, { useState, useEffect } from "react";
import * as fetch from "node-fetch";
import * as cheerio from "cheerio";

const ApgList = (props) => {
  const [state, setState] = useState({
    apg: [],
  });
  const getApg = async (apg) => {
    try {
      const response = await fetch("/api/v1/crawlApg");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      const $ = cheerio.load(body);

      setState({ apg: body });
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getApg();
  }, []);

  const apgListItems = state.apg.map((apgItem, i) => {
    debugger;
    return (
      <div key={i} className="card">
        <img
          src="https://photos.skyline.com/uploads/block/floated_image_block_data/image/1728/floated_shutterstock_145605907.gif"
          className="thumb"
        />
        <div className="status">Auction status: {apgItem.auction_status}</div>
        <p className="date">{apgItem.date}</p>

        <p className="style">Address: {apgItem.address}</p>
        <p className="style">{apgItem.required_deposit}</p>
        <p className="style">{apgItem.property_status}</p>
      </div>
    );
  });

  return <div className="list-item">{apgListItems}</div>;
};

export default ApgList;
