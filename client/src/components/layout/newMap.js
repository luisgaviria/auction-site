import React from "react";

import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";

import { formatRelative } from "date-fns";

import mapStyles2 from "./mapStyles2.js";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 42.361145,
  lng: -71.057083,
};

const options = {
  styles: mapStyles2,
  disableDefaultUI: true,
  zoomControl: true,
};

export default function NewMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBIa95EK04YAEKm3rg3QN0nbxmRpTRIwk4",
    libraries,
  });

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onLoad={onMapLoad}
      ></GoogleMap>
    </div>
  );
}
