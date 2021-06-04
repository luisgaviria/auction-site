import React, { useEffect } from "react";
import { compose, withProps, lifecycle } from "recompose";
import Geocode from "react-geocode";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "react-google-maps";

import mapStyles from "./mapStyles.js";

import auctionMarker from "./photos/auction.png";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBIa95EK04YAEKm3rg3QN0nbxmRpTRIwk4",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `480px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const [state, updateState] = React.useState({ directions: [] });
  const forceUpdate = React.useCallback(() => updateState({ ...state }), []);

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };

  const onClick = (location, myPosition) => {
    const DirectionsService = new google.maps.DirectionsService();
    console.log(myPosition);
    //console.log(location);
    DirectionsService.route(
      {
        origin: new google.maps.LatLng(42.42143, -71.1363), //myPosition.lat, myPosition.lng),
        destination: new google.maps.LatLng(location.lat, location.lng),
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          updateState({ directions: result });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };
  return (
    <GoogleMap
      defaultZoom={8}
      center={
        props.positions[0]
          ? props.positions[0].location
          : {
              lat: 42.361145,
              lng: -72.057083,
            }
      }
      defaultCenter={{
        lat: 42.361145,
        lng: -72.057083,
      }}
      onIdle={() => forceUpdate()}
      options={options}
    >
      {props.positions.map((address, index) => {
        return props.isMarkerShown ? (
          <Marker
            key={index}
            position={address.location}
            icon={{
              url: auctionMarker,
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              // anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => onClick(address.location, props.positions[0])}
          />
        ) : null;
      })}
      {props.directions && <DirectionsRenderer directions={state.directions} />}
    </GoogleMap>
  );
});

class MyFancyComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMarkerShown: false,
      positions: [],
    };
    this.onClickEvent.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await fetch("/api/v1/crawl");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();

      //console.log(body);
      Geocode.setApiKey("AIzaSyBIa95EK04YAEKm3rg3QN0nbxmRpTRIwk4");
      Geocode.setLanguage("en");
      Geocode.setRegion("us");
      //Geocode.enableDebug();
      const auctions_addresses = [];
      body.allAuctions.map(async (auction) => {
        const response = await Geocode.fromAddress(auction.address);
        const location = response.results[0].geometry.location;
        auctions_addresses.push({
          location: location,
          address: auction.address,
        });
      });
      await navigator.geolocation.getCurrentPosition(async function (position) {
        /*console.log(position);
        address = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }*/
        auctions_addresses.push({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });
      this.setState({ ...this.state, positions: auctions_addresses, directions: [] });
    } catch (err) {
      console.log(err);
    }
  }

  onClickEvent(location, myPosition) {}
  /*componentWillReceiveProps() {
    console.log(this.props.addresses);
    this.setState({
      ...this.state,
        positions: this.props.addresses
    })
  }*/

  render() {
    return (
      <MyMapComponent
        isMarkerShown
        onClickEvent={this.onClickEvent}
        positions={this.state.positions}
        directions={this.state.directions}
      />
    );
  }
}

export default MyFancyComponent;
