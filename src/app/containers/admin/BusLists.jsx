import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../../firebase/firebaseConfig";
import { collection, where, query, onSnapshot } from "firebase/firestore";

import ListItem from "../../components/ListItem";
import useAuth from "../../context/auth/useAuth";
import Loader from "../../components/Loader";
import useApi from "../../hooks/useApi";

const BusLists = () => {
  const [buses, setBuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { deleteDocument } = useApi();
  const { user } = useAuth();

  const getBusInformation = () => {
    setIsLoading(true);
    const busCollection = collection(database, "bus");
    const q = query(busCollection, where("institute", "==", user.institute));

    const unsubscribe = onSnapshot(q, (busSnapshot) => {
      const busList = busSnapshot.docs.map((bus) => ({
        id: bus.id,
        ...bus.data(),
      }));
      setBuses(busList);
      setIsLoading(false);
    });

    return unsubscribe;
  };

  const handleDelete = (id) => {
    deleteDocument("bus", id);
  };

  useEffect(() => {
    const unsubscribe = getBusInformation();
    return () => unsubscribe();
  }, []);

  if (isLoading) return <Loader />;

  if (buses.length === 0) return <h3>No Buses Added</h3>;

  return (
    <>
      <h1>BUSES LIST</h1>

      <div className="items">
        <ol className="p-0">
          {buses.map((bus) => (
            <ListItem
              title={bus.busNo}
              id={bus.id}
              to={`/admin/bus`}
              state={{
                id: bus.id,
                busNo: bus.busNo,
                licenseNo: bus.licenseNo,
                image: bus.image,
                imageName: bus.imageName,
                routes: bus.busRoutes,
                maintainance: bus.maintainance,
                seatCapacity: bus.seatCapacity,
              }}
              onDelete={() => handleDelete(bus.id)}
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
                    seatCapacity: bus.seatCapacity,
                  },
                })
              }
            />
          ))}
        </ol>
      </div>
    </>
  );
};

export default BusLists;