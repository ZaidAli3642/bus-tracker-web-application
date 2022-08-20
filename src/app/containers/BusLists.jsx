import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase/firebaseConfig";
import { collection, where, query, getDocs } from "firebase/firestore";
import ListItem from "../components/ListItem";
import useAuth from "../context/auth/useAuth";
import Loader from "../components/Loader";

const BusLists = () => {
  const [buses, setBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const getBusInformation = async () => {
    setIsLoading(true);
    const busCollection = collection(database, "bus");
    const q = query(busCollection, where("institute", "==", user.institute));

    const busSnapShot = await getDocs(q);
    const busList = busSnapShot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));
    setBuses(busList);
    setIsLoading(false);
  };

  useEffect(() => {
    getBusInformation();
  }, []);

  if (isLoading) return <Loader />;

  if (buses.length === 0) return <h3>No Buses Added</h3>;

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
