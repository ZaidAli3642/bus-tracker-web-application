import Input from "../components/Input";

const UpdateStudentInfo = () => {
  return (
    <>
      <div className="admin">
        <h1>UPDATE YOUR INFORMATION</h1>
        <div className="items">
          <h4>Personal Information</h4>
          <div className="line"></div>

          <div className="image-container">
            <img
              src={require("../assets/zaid-saleem-image.jpg")}
              className="profile-image"
            />
          </div>
          <div className="line"></div>
          <div className="items-details">
            <Input label="First Name" value={"First Name"} />
            <Input label={"Last Name"} value="Last Name" />
          </div>
          <div className="items-details">
            <Input label="Father/Guardian Name" value="Father/Guardian Name" />
            <Input label="College/University" value="GCUF" />
          </div>
          <div className="items-details">
            <Input label="Contact No" value="Contact No" />
            <Input label="Father/Guardian No" value="Father/Guardian No" />
          </div>
          <div className="line"></div>
          <h4>Physical Address</h4>
          <div className="items-details">
            <Input label="Country" value="Country Name" />
            <Input label="City Name" value="City Name" />
          </div>
          <div className="items-details">
            <Input label="Address" value="Address" />
            <Input label="Postal Code" value="Postal Code" />
          </div>
          <div className="items-details">
            <Input label="Contact" value="Contact" />
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateStudentInfo;
