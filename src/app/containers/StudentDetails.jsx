import Detail from "../components/Detail";

const StudentDetails = () => {
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
        <div className="line"></div>
        <div className="items-details">
          <div>
            <Detail label="Full Name" detail="Detail 1" />
          </div>
          <div className="right-item">
            <Detail label="Father/Guardian" detail="Detail 2" />
          </div>
        </div>

        <div className="items-details">
          <div>
            <Detail label="contact no" detail="Detail 5" />
          </div>
          <div className="right-item">
            <Detail label="Father/Guardian no" detail="Detail 6" />
          </div>
        </div>

        <div className="items-details">
          <div>
            <Detail label="College/University" detail="Detail 3" />
          </div>
          <div className="right-item">
            <Detail label="Class/Semester" detail="Detail 4" />
          </div>
        </div>

        <h4>Physical Address</h4>
        <div className="line"></div>
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

export default StudentDetails;
