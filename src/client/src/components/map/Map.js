import React, { useEffect } from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  // DirectionsRenderer,
  InfoWindow,
} from "react-google-maps";

import { google_key } from "./google-key.js";

import mapStyles from "./mapStyles.js";


import auctionMarker from "./marker/marker.webp";
import axios from "axios";
import {url} from "../../url";

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${google_key}`,
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
    zoomControl: true,
  };

  
  // const onMapLoad = React.useCallback((map) => {
  //   mapRef.current = map;
  // }, []);

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
              lat: 42.0654,
              lng: -71.2478,
            }
      }
      defaultCenter={{
        lat: 42.0654,
        lng: -71.2478,
      }}
      onIdle={() => forceUpdate()}
      options={options}
    >
      {props.auctions.map((auction, index) => {
        console.log(auction)
        return (
        // return props.isMarkerShown ? (
          <Marker
            key={index}
            alt="map marker icon"
            position={{lat: auction.location.lat,lng: auction.location.lng}}
            // position={auction.location}
            icon={{
              url: auctionMarker,
              scaledSize: new window.google.maps.Size(48, 48),
              origin: new window.google.maps.Point(0, 0),
            }}
            onClick={() => {
              setSelected(auction);
            }}
            // onMouseOver={() => {
            //   console.log(auction);
            // }}
          />
        // ) : null;
        )

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
            <a href={selected.link} target="blank"><span>Auction link!</span></a>
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
      {/* {props.directions && <DirectionsRenderer directions={state.directions} />} */}
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

  // async componentWillReceiveProps(newProps){
    // try {
    //   const response = await axios.get(url+`/api/v1/crawl?page=${newProps.page}&limit=${newProps.limit}`,{
    //       headers: {
    //           "Content-type": "application/json",
    //           "Authorization": "Bearer "+localStorage.getItem("token")
    //       }
    //   })
    // //   const response = await fetch("/api/v1/crawl");
    // //   if (!response.ok) {
    // //     const errorMessage = `${response.status} (${response.statusText})`;
    // //     const error = new Error(errorMessage);
    // //     throw error;
    // //   }
    // //   console.log(response.data);

    //   const body = response.data;

    //   const auctions = [];
    //   body.allAuctions.map((auction) => {
    //     console.log(auction);
    //     const location = {
    //       lat: parseFloat(auction.lat),
    //       lng: parseFloat(auction.lng),
    //     };
    //     auctions.push({
    //       location: location,
    //       address: auction.address,
    //       deposit: auction.deposit,
    //       status: auction.status,
    //       link: auction.link
    //     });
    //   });
    //   // await navigator.geolocation.getCurrentPosition(async function (position) {
    //   //   auctions.push({
    //   //     location: {
    //   //       lat: position.coords.latitude,
    //   //       lng: position.coords.longitude,
    //   //     },
    //   //   });
    //   // });
    //   this.setState({ ...this.state,auctions: auctions, directions: [] });
    // } catch (err) {
    //   console.log(err);
    // }
  // }

  async componentDidUpdate(prevProps){

    if(prevProps.page !== this.props.page){
      try {
        const response = await axios.get(url+`/api/v1/crawl?page=${this.props.page}&limit=${10}`,{
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("token")
            }
        })

        const body = response.data;
  
        const auctions = [];
        body.allAuctions.map((auction) => {
          const location = {
            lat: parseFloat(auction.lat),
            lng: parseFloat(auction.lng),
          };
          auctions.push({
            id: auction.id,
            location: location,
            address: auction.address,
            deposit: auction.deposit,
            status: auction.status,
            link: auction.link
          });
        });
        // await navigator.geolocation.getCurrentPosition(async function (position) {
        //   auctions.push({
        //     location: {
        //       lat: position.coords.latitude,
        //       lng: position.coords.longitude,
        //     },
        //   });
        // });
        this.setState({ ...this.state,auctions: auctions, directions: [] });
      } catch (err) {
        console.log(err);
      }
    }
  }

  componentDidMount() { // interval to rerender object
    // this.interval = setInterval(() => this.setState({  }), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  

  // async componentDidMount() {
  //   try {
  //     const response = await axios.get(url+`/api/v1/crawl?page=${this.props.page}&limit=${this.props.limit}`,{
  //         headers: {
  //             "Content-type": "application/json",
  //             "Authorization": "Bearer "+localStorage.getItem("token")
  //         }
  //     })
  //   //   const response = await fetch("/api/v1/crawl");
  //   //   if (!response.ok) {
  //   //     const errorMessage = `${response.status} (${response.statusText})`;
  //   //     const error = new Error(errorMessage);
  //   //     throw error;
  //   //   }
  //   //   console.log(response.data);

  //     const body = response.data;

  //     const auctions = [];
  //     body.allAuctions.map((auction) => {
  //       // console.log(auction);
  //       const location = {
  //         lat: parseFloat(auction.lat),
  //         lng: parseFloat(auction.lng),
  //       };
  //       auctions.push({
  //         location: location,
  //         address: auction.address,
  //         deposit: auction.deposit,
  //         status: auction.status,
  //         link: auction.link
  //       });
  //     });
  //     // await navigator.geolocation.getCurrentPosition(async function (position) {
  //     //   auctions.push({
  //     //     location: {
  //     //       lat: position.coords.latitude,
  //     //       lng: position.coords.longitude,
  //     //     },
  //     //   });
  //     // });
  //     this.setState({ ...this.state, auctions: auctions, directions: [] });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  onClickEvent(location, myPosition) {
  }
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
      />
    );
  }
}

export const MemoizedMap = React.memo(MyFancyComponent);
