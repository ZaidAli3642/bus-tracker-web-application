import { useState, useEffect } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  DirectionsRenderer,
  DirectionsService,
} from "@react-google-maps/api";

import Loader from "../../components/Loader";
import { ProSidebar, MenuItem, SubMenu, Menu } from "react-pro-sidebar";
import useApi from "../../hooks/useApi";
import useAuth from "../../context/auth/useAuth";

const Location = () => {
  const [map, setMap] = useState();
  const [response, setResponse] = useState();
  const [open, setOpen] = useState(false);
  const [routes, setRoutes] = useState([]);
  const { user } = useAuth();
  const { getDocumentByInstitute, data } = useApi();

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  //,process.env.REACT_APP_GOOGLE_MAP_API_KEY
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
  });

  const directions = async () => {
    const routesCopy = routes.map((route) => {
      return {
        location: {
          lat: parseFloat(route.latitude),
          lng: parseFloat(route.longitude),
        },
        stopover: true,
      };
    });
    console.log(routesCopy);
    const origin =
      routesCopy.length === 1
        ? // eslint-disable-next-line no-undef
          new google.maps.LatLng(
            routesCopy[0].location.lat,
            routesCopy[0].location.lng
          )
        : routesCopy.shift().location;
    const destination =
      routesCopy.length === 1
        ? // eslint-disable-next-line no-undef
          new google.maps.LatLng(
            routesCopy[0].location.lat,
            routesCopy[0].location.lng
          )
        : routesCopy.pop().location;

    // eslint-disable-next-line no-undef
    const directions = new google.maps.DirectionsService();

    const result = await directions.route({
      origin: origin,
      destination: destination,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
      waypoints: routesCopy,
    });

    setResponse(result);
  };

  const getBusDetails = () => {
    getDocumentByInstitute("bus", user.institute);
  };

  useEffect(() => {
    directions();
    getBusDetails();
  }, [routes]);

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <>
      <div className="row h-100">
        <div className="col-3 p-0">
          <ProSidebar style={{ width: "100%" }}>
            <Menu iconShape="square">
              <MenuItem>Dashboard</MenuItem>
              {data.map((bus) => (
                <SubMenu
                  onClick={() => setRoutes(bus.busRoutes)}
                  open={open}
                  onOpenChange={() =>
                    setOpen((prevState) => console.log(prevState))
                  }
                  title={bus.busNo}>
                  {bus.busRoutes.map((routes) => (
                    <MenuItem style={{ margin: 0 }}>
                      {`Latitude ${routes.latitude} & Longitude ${routes.longitude}`}
                    </MenuItem>
                  ))}
                </SubMenu>
              ))}
            </Menu>
          </ProSidebar>
        </div>
        <div className="col-9 p-0">
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
        </div>
      </div>
    </>
  );
};

export default Location;
