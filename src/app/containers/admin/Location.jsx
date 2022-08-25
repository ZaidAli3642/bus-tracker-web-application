/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  DirectionsRenderer,
} from "@react-google-maps/api";
import routes from "./routes.json";
import Loader from "../../components/Loader";

const Location = () => {
  const [map, setMap] = useState();
  const [response, setResponse] = useState();

  // const locations = [
  //   {
  //     id: 1,
  //     place: "karachi to sukkur",
  //     orglatlng: { lat: 24.8607, lng: 67.0011 },
  //     deslatlng: { lat: 27.7244, lng: 68.8228 },
  //   },
  //   {
  //     id: 2,
  //     place: "Sukkur to Multan",
  //     orglatlng: { lat: 27.7244, lng: 68.8228 },
  //     deslatlng: { lat: 30.1575, lng: 71.5249 },
  //   },
  // ];

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "",
  });

  const center = { lat: 40.756795, lng: -73.954298 };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const directions = async () => {
    const routesCopy = routes.map((route) => {
      return {
        location: { lat: route.location.lat, lng: route.location.lng },
        stopover: true,
      };
    });

    const origin =
      routesCopy.length === 1
        ? new google.maps.LatLng(
            routesCopy[0].location.lat,
            routesCopy[0].location.lng
          )
        : routesCopy.shift().location;
    const destination =
      routesCopy.length === 1
        ? new google.maps.LatLng(
            routesCopy[0].location.lat,
            routesCopy[0].location.lng
          )
        : routesCopy.pop().location;

    const directionsService = new google.maps.DirectionsService();

    const result = await directionsService.route({
      origin: origin,
      destination: destination,

      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: routesCopy,
    });

    setResponse(result);
  };

  useEffect(() => {
    directions();
  }, []);

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      zoom={15}
      center={center}
      options={{
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
      onLoad={(map) => setMap(map.panTo(center))}>
      <MarkerF position={center} />
      {response && (
        <DirectionsRenderer directions={response}></DirectionsRenderer>
      )}
    </GoogleMap>
  );
};

export default Location;
