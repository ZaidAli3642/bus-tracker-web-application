import { useLocation } from "react-router-dom";
import Detail from "../../components/Detail";

const StudentDetails = () => {
  const location = useLocation();

  const {
    firstname,
    lastname,
    parent,
    institute,
    parentcontact,
    country,
    city,
    address,
    postalcode,
    contact,
    busNo,
    image,
  } = location.state || {};
  return (
    <>
      <h1>Student Details</h1>
      <div className="items">
        <div className="image-container">
          <img
            src={image ? image : require("../../assets/student-avatar.jpg")}
            alt="student"
            className="profile-image"
          />
        </div>

        <h4>Personal Information</h4>
        <div className="line"></div>
        <div className="items-details">
          <div>
            <Detail label="Full Name" detail={`${firstname} ${lastname}`} />
          </div>
          <div className="right-item">
            <Detail label="Father/Guardian" detail={parent} />
          </div>
        </div>

        <div className="items-details">
          <div>
            <Detail label="contact no" detail={contact} />
          </div>
          <div className="right-item">
            <Detail label="Father/Guardian no" detail={parentcontact} />
          </div>
        </div>

        <div className="items-details">
          <div>
            <Detail label="College/University" detail={institute} />
          </div>
        </div>

        <h4>Physical Address</h4>
        <div className="line"></div>
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
            <Detail label="Postal Code" detail={postalcode} />
          </div>
          <div className="right-item">
            <Detail label="Address" detail={address} />
          </div>
        </div>
        <div className="items-details">
          <div>
            <Detail label="Bus No" detail={busNo} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDetails;
