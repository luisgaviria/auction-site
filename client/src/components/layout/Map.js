// const containerStyle = {
//   width: "1000px",
//   height: "400px",
// };

// const center = { lat: 42.361145, lng: -71.057083 };

// const directionService = new google.maps.DirectionsService();

// const directionDisplay = new google.maps.DirectionsRenderer();

// const map = new google.maps.Map(document.getElementsByClassName("map"));

// directionDisplay.setMap(map);

// function calcRoute() {
//   const request = {
//     origin: document.getElementsByClassName("from").value,
//     destination: document.getElementsByClassName("to"),
//     travelMode: google.maps.TravelMode.DRIVING,
//     unitSystem: google.maps.UnitSystem.IMPERIAL,
//   };
//   directionService.route(request, (result, status) => {
//     if (status === google.maps.DirectionsStatus.OK) {
//       const output = document.querySelector(".output");
//       output.innerHTML =
//         "<div class='alert-info'> From: " +
//         document.getElementsByClassName("from").value +
//         ".<br /> To: " +
//         document.getElementsByClassName("to").value +
//         "<br /> Driving distance:" +
//         result.routes[0].legs[0].distance.text +
//         ".<br />Duration: " +
//         result.routes[0].legs[0].duration.text +
//         ". </div>";

//       // display routes

//       directionDisplay.setDirections(result);
//     } else {
//       directionDisplay.setDirections({ routes: [] });
//       // center map
//       map.setCenter(center);

//       //show error

//       output.innerHTML = "<div class='alert-danger'>Dude that won't work... </div>";
//     }
//   });
// }

// // auto complete
// const options = {
//   types: ["(cities)"],
// };

// const input1 = document.getElementsByClassName("from");
// const autoComplete1 = new google.maps.places.Autocomplete(input1, options);

// const input2 = document.getElementsByClassName("to");
// const autoComplete2 = new google.maps.places.Autocomplete(input2, options);

/*class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        lat: 42.361145,
        lng: -71.057083,
      },
      google: props.google,
      visible: false,
    };
  }

  onMouseoverMarker(props) {
    console.log(props.name);
  }
  componentWillReceiveProps(props) {
    this.setState({
      position: {
        lat: 42.361145,
        lng: -72.057083,
      },
      google: props.google,
      addresses: props.addresses,
      visible: true,
    });
  }

  displayMarkers = () => {
    if (this.state.addresses) {
      return this.state.addresses.map((address, index) => {
        return (
          <Marker
            key={index}
            id={index}
            position={{
              lat: address.location.lat,
              lng: address.location.lng,
            }}
            onMouseover={this.onMouseoverMarker}
            name={address}
          />
        );
      });
    }
  };
  render() {

    return (
      <div>
        <Map
          value={this.state.address}
          visible={this.state.visible ? true : false}
          // style={containerStyle}
          initialCenter={this.state.position}
          google={this.state.google}
          zoom={8}
          onIdle={() => {
            this.forceUpdate();
          }}
        >
          {this.displayMarkers()}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBIa95EK04YAEKm3rg3QN0nbxmRpTRIwk4",
})(MapContainer); */

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

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBIa95EK04YAEKm3rg3QN0nbxmRpTRIwk4",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const [state, updateState] = React.useState({ directions: [] });
  const forceUpdate = React.useCallback(() => updateState({ ...state }), []);

  const onClick = (location, myPosition) => {
    const DirectionsService = new google.maps.DirectionsService();
    console.log(myPosition);
    console.log(location);
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
    >
      {props.positions.map((address, index) => {
        return props.isMarkerShown ? (
          <Marker
            key={index}
            position={address.location}
            onClick={() => onClick(address.location, props.positions[0].location)}
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
      navigator.geolocation.getCurrentPosition(function (position) {
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
