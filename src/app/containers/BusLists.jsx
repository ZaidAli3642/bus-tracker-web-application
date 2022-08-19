import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase/firebaseConfig";
import { collection, onSnapshot, getDocs } from "firebase/firestore";
import ListItem from "../components/ListItem";

const BusLists = () => {
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();

  const getBusInformation = async () => {
    const busCollection = collection(database, "bus");

    const busSnapShot = await getDocs(busCollection);
    const busList = busSnapShot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));
    setBuses(busList);
  };

  useEffect(() => {
    getBusInformation();
  }, []);

  return (
    <>
      <h1>BUSES LIST</h1>
      <div className="items">
        {buses.map((bus) => (
          <ListItem
            title={bus.licenseNo}
            id={bus.id}
            to={`/admin/bus`}
            state={{
              busNo: bus.busNo,
              licenseNo: bus.licenseNo,
              image: bus.image,
              imageName: bus.imageName,
              routes: bus.busRoutes,
              maintainance: bus.maintainance,
            }}
            onClick={() =>
              navigate(`/admin/bus_update/${bus.id}`, {
                state: {
                  busNo: bus.busNo,
                  licenseNo: bus.licenseNo,
                  image: bus.image,
                  imageName: bus.imageName,
                  routes: bus.busRoutes,
                  maintainance: bus.maintainance,
                  isUpdated: true,
                  isBusAlloted: bus.isBusAlloted,
                },
              })
            }
          />
        ))}
      </div>
    </>
  );
};

export default BusLists;
