import Detail from "../components/Detail";

const driverDetails = [
  {
    id: 1,
    name: "Driver 1",
    age: 27,
    salary: 20000,
    licence: "Yes",
    contactInfo: "123456789",
  },
];

const DriverDetails = () => {
  return (
    <>
      <h1>DRIVER DETAILS</h1>
      <div className="items">
        <div className="image-container">
          <img
            src={require("../assets/zaid-saleem-image.jpg")}
            alt=""
            className="profile-image"
          />
        </div>

        <h4>Personal Information</h4>
        <div className="items-details">
          <div>
            <Detail label="Full Name" detail="Detail 1" />
          </div>
          <div className="right-item">
            <Detail label="Age" detail="Detail 2" />
          </div>
        </div>

        <div className="items-details">
          <div>
            <Detail label="Salary" detail="Detail 3" />
          </div>
          <div className="right-item">
            <Detail label="Licence" detail="Detail 4" />
          </div>
        </div>

        <h4>Physical Address</h4>
        <div className="items-details">
          <div>
            <Detail label="Country" detail="Country Name" />
          </div>
          <div className="right-item">
            <Detail label="City" detail="City Name" />
          </div>
        </div>

        <div className="items-details">
          <div>
            <Detail label="Postal Code" detail="Postal Code" />
          </div>
          <div className="right-item">
            <Detail label="Address" detail="Full Address" />
          </div>
        </div>
        <div className="items-details">
          <div>
            <Detail label="Contact Info" detail="Detail 1" />
          </div>
        </div>
      </div>
    </>
  );
};

export default DriverDetails;
