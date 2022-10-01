import { useState, useEffect } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  DirectionsRenderer,
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
  const [students, setStudents] = useState([]);
  const { user } = useAuth();
  const [buses, setBuses] = useState([]);
  const { getDocumentByInstitute } = useApi();
  const [filteredBuses, setFilteredBuses] = useState([]);
  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  //,process.env.REACT_APP_GOOGLE_MAP_API_KEY
  // "AIzaSyAuEoedfRUtYDOBUsLoGEZUPWeNJOEoXXg"
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
      };
    });
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
    console.log(destination);

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

  const getBusAndStudentDetails = async () => {
    const buses = await getDocumentByInstitute("bus", user.institute);
    const students = await getDocumentByInstitute("students", user.institute);

    setStudents(students);
    setBuses(buses);
    setFilteredBuses(buses);
  };

  const handleSearch = (search) => {
    if (!search) return setFilteredBuses(buses);

    const studentBusNo = students.filter((student) =>
      String(student.rollNo).includes(search)
    );

    const filtered = filteredBuses.filter(
      (data) => data.busNo === search || studentBusNo[0]?.busNo === data.busNo
    );

    console.log(filtered);

    setFilteredBuses(filtered);
  };

  useEffect(() => {
    directions();
  }, [routes, filteredBuses]);

  useEffect(() => {
    getBusAndStudentDetails();
  }, []);

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
              <div class="mb-3">
                <input
                  type="search"
                  class="form-control w-75 ms-3"
                  id="search"
                  placeholder="Search Route"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              {filteredBuses.map((bus) => (
                <SubMenu
                  onClick={() => setRoutes(bus.busRoutes)}
                  open={open}
                  onOpenChange={() =>
                    setOpen((prevState) => console.log(prevState))
                  }
                  title={bus.busNo}
                >
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
            onLoad={(map) => setMap(map.panTo(center))}
          >
            {!response && <MarkerF position={center} />}

            <DirectionsRenderer directions={response}></DirectionsRenderer>
          </GoogleMap>
        </div>
      </div>
    </>
  );
};

export default Location;
