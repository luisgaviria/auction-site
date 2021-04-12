import React, { useState, useEffect } from "react";
import * as fetch from "node-fetch";
import * as cheerio from "cheerio";

const DeanList = (props) => {
  const [state, setState] = useState({
    repo: [],
    dean: [],
  });
  const getDean = async (repo) => {
    try {
      const response = await fetch("/api/v1/crawlDean");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      const $ = cheerio.load(body);

      setState({ repo: repo, dean: body });
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getDean();
  }, []);

  const deanListItems = state.dean.map((deanItem, i) => {
    return (
      <div key={i}>
        <p>{deanItem.date}</p>
        <p>{deanItem.hour}</p>
        <p>{deanItem.address}</p>
        <p>{deanItem.deposit}</p>
        <p>{deanItem.balance_due}</p>
      </div>
    );
  });

  return <div className="list-item">{deanListItems}</div>;
};

export default DeanList;
