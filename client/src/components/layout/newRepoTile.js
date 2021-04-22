import React from "react";

const NewRepoTile = (props) => {
  const { status, date, address, city, state, link, deposit, id } = props.repoData;
  return (
    <div key={id} className="card">
      <a href={link} target="_blank">
        <img
          src="https://photos.skyline.com/uploads/block/floated_image_block_data/image/1728/floated_shutterstock_145605907.gif"
          className="thumb"
        />

        <div className="status">Status: {status ? status : "no status displayed"}</div>
        <div className="date">Date: {date ? date : "no date displayed"}</div>
        <div className="address">Address: {address ? address : "no address displayed"}</div>
        <div className="address">City: {city ? city : "no city displayed"}</div>
        <div className="address">State: {state ? state : "no city displayed"}</div>
        <div className="deposit">Deposit: {deposit ? deposit : "no deposit displayed"}</div>
      </a>
    </div>
  );
};

// <div key={i} className="card">

//   <div className="infos">
//     <div className="status">
//       Status: {repoItem.status ? repoItem.status : "no status displayed"}
//     </div>
//     <div className="date">
//       Date: {repoItem.date ? repoItem.date : "no date displayed"}
//     </div>
//     <div className="address">
//       {repoItem.address ? repoItem.address : "no address displayed"}
//     </div>
//     <div className="address">{repoItem.city || ""} </div>
//     <div className="address">{repoItem.state || ""}</div>
//     <div className="address">{repoItem.link || ""}</div>
//   </div>
// </div>

export default NewRepoTile;
