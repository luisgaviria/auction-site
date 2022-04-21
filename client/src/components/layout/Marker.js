import React from "react";
import "./Marker.scss";

const Marker = (props) => {
  return (
    <div role="listitem" aria-checked="true" alt="map marker icon">
      <div className="pin" alt="map marker icon"></div>

      <div className="pulse" alt="map marker icon"></div>
    </div>
  );
};

export default Marker;
