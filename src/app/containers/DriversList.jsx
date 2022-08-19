import { useNavigate } from "react-router-dom";
import ListItem from "../components/ListItem";
import { useEffect, useState } from "react";
import { database } from "../firebase/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

const DriversList = () => {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState([]);

  const getDriversInformation = () => {
    const driverCollection = collection(database, "drivers");
    const unsubscribe = onSnapshot(driverCollection, (driverSnapshot) => {
      const driversList = driverSnapshot.docs.map((driver) => ({
        id: driver.id,
        ...driver.data(),
      }));
      setDrivers(driversList);
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = getDriversInformation();
    return () => unsubscribe();
  }, []);

  return (
    <>
      <h1>DRIVERS LIST</h1>
      <div className="items">
        {drivers.map((driver) => (
          <ListItem
            id={driver.id}
            to={`/admin/driver`}
            state={{
              id: driver.id,
              firstname: driver.firstname,
              lastname: driver.lastname,
              contact: driver.contact,
              age: driver.age,
              salary: driver.salary,
              image: driver.image,
              imageName: driver.imageName,
              country: driver.country,
              city: driver.city,
              address: driver.address,
              postalcode: driver.postalcode,
              busNo: driver.busNo,
              driverDutyTime: driver.driverDutyTime,
              driverDutyEnd: driver.driverDutyEnd,
            }}
            title={driver.firstname}
            onClick={() =>
              navigate("/admin/driver_update/" + driver.id, {
                state: {
                  id: driver.id,
                  firstname: driver.firstname,
                  lastname: driver.lastname,
                  contact: driver.contact,
                  age: driver.age,
                  image: driver.image,
                  imageName: driver.imageName,
                  salary: driver.salary,
                  country: driver.country,
                  city: driver.city,
                  address: driver.address,
                  postalcode: driver.postalcode,
                  busNo: driver.busNo,
                  driverDutyTime: driver.driverDutyTime,
                  driverDutyEnd: driver.driverDutyEnd,
                  isUpdated: true,
                },
              })
            }
          />
        ))}
      </div>
    </>
  );
};

export default DriversList;
