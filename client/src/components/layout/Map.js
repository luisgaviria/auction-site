import React, { useEffect } from "react";
import { compose, withProps, lifecycle } from "recompose";
import fetch from "node-fetch";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  InfoWindow,
} from "react-google-maps";

import mapStyles from "./mapStyles.js";

import auctionMarker from "./photos/auction.png";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyC7idetxYH3xqundQWiHiQ3PNtXxW7-ygY",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `480px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const [state, updateState] = React.useState({ directions: [] });
  const forceUpdate = React.useCallback(() => updateState({ ...state }), []);
  const [selected, setSelected] = React.useState(null);

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  // const onClick = (location, myPosition) => {
  //   // const DirectionsService = new google.maps.DirectionsService();
  //   // console.log(myPosition);
  //   // //console.log(location);
  //   // DirectionsService.route(
  //   //   {
  //   //     origin: new google.maps.LatLng(42.42143, -71.1363),
  //   //     destination: new google.maps.LatLng(location.lat, location.lng),
  //   //     travelMode: google.maps.TravelMode.DRIVING,
  //   //   },
  //   //   (result, status) => {
  //   //     if (status === google.maps.DirectionsStatus.OK) {
  //   //       updateState({ directions: result });
  //   //     } else {
  //   //       console.error(`error fetching directions ${result}`);
  //   //     }
  //   //   }
  //   // );
  // };
  return (
    <GoogleMap
      defaultZoom={8}
      center={
        props.auctions[0]
          ? props.auctions[0].location
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
      {props.auctions.map((auction, index) => {
        console.log(auction);
        return props.isMarkerShown ? (
          <Marker
            key={index}
            position={auction.location}
            icon={{
              url: auctionMarker,
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              // anchor: new window.google.maps.Point(15, 15),
            }}
            onClick={() => {
              setSelected(auction);
            }}
            // onMouseOver={() => {
            //   console.log(auction);
            // }}
          />
        ) : null;
      })}
      {selected ? (
        <InfoWindow
          position={{ lat: selected.location.lat, lng: selected.location.lng }}
          onCloseClick={() => {
            setSelected(null);
          }}
        >
          <div>
            <h4>{selected.address}</h4>
            <h4>{selected.status}</h4>
            <h4>{selected.deposit}</h4>
          </div>
        </InfoWindow>
      ) : null}
      {/* {selected ? (
        <InfoWindow>
          <div>
            <h1>{address.location}</h1>
          </div>
        </InfoWindow>
      ) : null} */}
      {props.directions && <DirectionsRenderer directions={state.directions} />}
    </GoogleMap>
  );
});

class MyFancyComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMarkerShown: false,
      auctions: [],
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

      const auctions = [];
      body.allAuctions.map((auction) => {
        // console.log(auction);
        const location = {
          lat: parseFloat(auction.lat),
          lng: parseFloat(auction.lng),
        };
        auctions.push({
          location: location,
          address: auction.address,
          deposit: auction.deposit,
          status: auction.status,
        });
      });
      await navigator.geolocation.getCurrentPosition(async function (position) {
        auctions.push({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      });
      this.setState({ ...this.state, auctions: auctions, directions: [] });
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
        auctions={this.state.auctions}
        directions={this.state.directions}
      />
    );
  }
}

export default MyFancyComponent;
