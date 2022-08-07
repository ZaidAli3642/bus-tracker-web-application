import ListItem from "../components/ListItem";

const driversList = [
  { id: 1, driverName: "Driver 1", to: `/driver` },
  { id: 2, driverName: "Driver 2", to: `/driver` },
  { id: 3, driverName: "Driver 3", to: `/driver` },
  { id: 4, driverName: "Driver 4", to: `/driver` },
  { id: 5, driverName: "Driver 5", to: `/driver` },
  { id: 6, driverName: "Driver 6", to: `/driver` },
];

const DriversList = () => {
  return (
    <>
      <h1>DRIVERS LIST</h1>
      <div className="items">
        {driversList.map((driver) => (
          <ListItem id={driver.id} to={driver.to} title={driver.driverName} />
        ))}
      </div>
    </>
  );
};

export default DriversList;
