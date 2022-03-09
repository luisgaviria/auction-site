import React from "react";
import "./Marker.scss";

const Marker = (props) => {
  return (
    <div role="listitem" aria-checked="true">
      <div className="pin"></div>

      <div className="pulse"></div>
    </div>
  );
};

export default Marker;
