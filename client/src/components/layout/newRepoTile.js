import React from "react";
// import { Link } from "react-router-dom";
// import crawl from "../../../../server/src/apiClient/crawlClient";

const NewRepoTile = (props) => {
  const { status, date, address, city, state, link, deposit, logo, id, crawlId } = props.repoData;
  return (
    <div key={id} className="card">
      <a href={link} target="_blank">
        <img
          src={
            logo ||
            "https://photos.skyline.com/uploads/block/floated_image_block_data/image/1728/floated_shutterstock_145605907.gif"
          }
          className="thumb"
        />

        <div className="status">{status ? status : "On Schedule"}</div>
        <div className="date">Date: {date ? date : "no date displayed"}</div>
        <div className="address">Address: {address ? address : "no address displayed"}</div>
        {city ? <div className="address">City: {city ? city : null} </div> : null}
        {city ? <div className="address">State: {state ? state : null} </div> : null}
        <div className="deposit">Deposit: {deposit ? deposit : "not available"}</div>
      </a>
    </div>
  );
};

export default NewRepoTile;
