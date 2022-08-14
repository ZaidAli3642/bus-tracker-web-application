import ListItem from "../components/ListItem";

const busList = [
  { id: 1, busName: "Bus 1", to: `/admin/bus` },
  { id: 2, busName: "Bus 2", to: `/admin/bus` },
  { id: 3, busName: "Bus 3", to: `/admin/bus` },
  { id: 4, busName: "Bus 4", to: `/admin/bus` },
  { id: 5, busName: "Bus 5", to: `/admin/bus` },
  { id: 6, busName: "Bus 6", to: `/admin/bus` },
];

const BusLists = () => {
  return (
    <>
      <h1>BUSES LIST</h1>
      <div className="items">
        {busList.map((bus) => (
          <ListItem title={bus.busName} id={bus.id} to={bus.to} />
        ))}
      </div>
    </>
  );
};

export default BusLists;
