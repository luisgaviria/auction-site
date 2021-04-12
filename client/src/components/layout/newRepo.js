import React, { useState, useEffect } from "react";
import * as fetch from "node-fetch";
import * as cheerio from "cheerio";

const RepoList = (props) => {
  const [state, setState] = useState({
    repo: [],
    dean: [],
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

      setState({ ...state, repo: body });

      // getDean(body);

      console.log(body);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  // const getDean = async (repo) => {
  //   try {
  //     const response = await fetch("/api/v1/crawlDean");
  //     if (!response.ok) {
  //       const errorMessage = `${response.status} (${response.statusText})`;
  //       const error = new Error(errorMessage);
  //       throw error;
  //     }
  //     const body = await response.json();
  //     const $ = cheerio.load(body);

  //     setState({ repo: repo, dean: body });
  //   } catch (err) {
  //     console.error(`Error in fetch: ${err.message}`);
  //   }
  // };

  let icon = "https://i.postimg.cc/dQHgDG8P/Screen-Shot-2021-03-07-at-10-39-2.png";

  useEffect(() => {
    getRepo();
  }, []);
  const repoListItems = state.repo.map((repoItem, i) => {
    return (
      <div key={i} className="list-container ">
        <div className="icon-image">
          <img src="https://i.postimg.cc/dQHgDG8P/Screen-Shot-2021-03-07-at-10-39-2.png"></img>
        </div>
        <div className="serial">{repoItem.serial_number}</div>
        <div className="status">{repoItem.status}</div>
        <div className="date">{repoItem.date}</div>
        <div className="address">{repoItem.address}</div>
        <div className="style">{repoItem.victorian_family}</div>
      </div>
    );
  });

  // const deanListItems = state.dean.map((deanItem, i) => {
  //   return (
  //     <div key={i}>
  //       <p>{deanItem.date}</p>
  //       <p>{deanItem.hour}</p>
  //       <p>{deanItem.address}</p>
  //       <p>{deanItem.deposit}</p>
  //       <p>{deanItem.balance_due}</p>
  //     </div>
  //   );
  // });

  return (
    <div className="list-item">
      {repoListItems}
      {/* {deanListItems} */}
    </div>
  );
};

export default RepoList;
