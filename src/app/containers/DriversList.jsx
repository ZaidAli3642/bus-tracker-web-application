import { useNavigate } from "react-router-dom";
import ListItem from "../components/ListItem";

const driversList = [
  { id: 1, driverName: "Driver 1", to: `/admin/driver` },
  { id: 2, driverName: "Driver 2", to: `/admin/driver` },
  { id: 3, driverName: "Driver 3", to: `/admin/driver` },
  { id: 4, driverName: "Driver 4", to: `/admin/driver` },
  { id: 5, driverName: "Driver 5", to: `/admin/driver` },
  { id: 6, driverName: "Driver 6", to: `/admin/driver` },
];

const DriversList = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>DRIVERS LIST</h1>
      <div className="items">
        {driversList.map((driver) => (
          <ListItem
            id={driver.id}
            to={driver.to}
            title={driver.driverName}
            onClick={() => navigate("/admin/driver_update/" + driver.id)}
          />
        ))}
      </div>
    </>
  );
};

export default DriversList;
