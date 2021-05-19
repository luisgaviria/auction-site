import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

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

class MapContainer extends Component {
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

  onMouseoverMarker(props, marker, e) {
    console.log(props.position);
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
})(MapContainer);
