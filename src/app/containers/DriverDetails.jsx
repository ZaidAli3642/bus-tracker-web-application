import { useLocation } from "react-router-dom";
import Detail from "../components/Detail";

const DriverDetails = () => {
  const location = useLocation();
  const {
    firstname,
    lastname,
    age,
    salary,
    contact,
    country,
    city,
    address,
    postalcode,
    busNo,
    driverDutyTime,
    driverDutyEnd,
    image,
  } = location.state || {};
  console.log(contact);

  return (
    <>
      <h1>DRIVER DETAILS</h1>
      <div className="items">
        <div className="image-container">
          <img
            src={image ? image : require("../assets/driver-avatar.png")}
            alt=""
            className="profile-image"
          />
        </div>

        <h4>Personal Information</h4>
        <div className="items-details">
          <div>
            <Detail label="Full Name" detail={`${firstname} ${lastname}`} />
          </div>
          <div className="right-item">
            <Detail label="Age" detail={age} />
          </div>
        </div>

        <div className="items-details">
          <div>
            <Detail label="Salary" detail={salary} />
          </div>
          <div className="right-item">
            <Detail label="Contact" detail={contact} />
          </div>
        </div>

        <h4>Physical Address</h4>
        <div className="items-details">
          <div>
            <Detail label="Country" detail={country} />
          </div>
          <div className="right-item">
            <Detail label="City" detail={city} />
          </div>
        </div>

        <div className="items-details">
          <div>
            <Detail label="Address" detail={address} />
          </div>
          <div className="right-item">
            <Detail label="Postal Code" detail={postalcode} />
          </div>
        </div>
        <div className="items-details">
          <div>
            <Detail label="Bus No" detail={busNo} />
          </div>
        </div>
        <div className="items-details">
          <div>
            <Detail label="Duty Start" detail={driverDutyTime} />
          </div>
          <div className="right-item">
            <Detail label="Duty End" detail={driverDutyEnd} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DriverDetails;
