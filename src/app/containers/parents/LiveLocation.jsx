import { useState } from "react";
import { ProSidebar, Menu, SubMenu, MenuItem } from "react-pro-sidebar";
import {
  GoogleMap,
  MarkerF,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import Loader from "../../components/Loader";

const LiveLocation = () => {
  const [map, setMap] = useState();
  const [open, setOpen] = useState(false);
  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
  });

  if (!isLoaded) return <Loader />;

  return (
    <>
      <div className="map-container">
        <div className="row h-100">
          <div className="col-3 p-0">
            <ProSidebar style={{ width: "100%" }}>
              <Menu iconShape="square">
                <MenuItem>Dashboard</MenuItem>
                <SubMenu
                  open={open}
                  onOpenChange={() => setOpen(!open)}
                  title={"component"}>
                  <MenuItem style={{ margin: 0 }}>{`Latitude`}</MenuItem>
                </SubMenu>
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
              {/* {response && (
              <DirectionsRenderer directions={response}></DirectionsRenderer>
            )} */}
            </GoogleMap>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveLocation;
