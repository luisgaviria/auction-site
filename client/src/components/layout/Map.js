import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

const containerStyle = {
  width: "1000px",
  height: "400px",
};

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
            onClick={() => console.log("You clicked me!")}
          />
        );
      });
    }
  };
  render() {
    return (
      <div>
        <Map
          visible={this.state.visible ? true : false}
          // style={containerStyle}
          initialCenter={this.state.position}
          google={this.state.google}
          zoom={14}
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
  apiKey: "",
})(MapContainer);
