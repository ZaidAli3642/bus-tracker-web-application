import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>HELLO ZAID</h1>
      <label htmlFor="" className="label">
        Welcome Back!
      </label>
      <div className="admin">
        <div className="update-container">
          <div
            onClick={() => navigate("/admin/1")}
            className="update update-admin"
          >
            <p>Update Your Information</p>
          </div>
          <div
            onClick={() => navigate("/student_update/1")}
            className="update update-student"
          >
            <p>Update Student Information</p>
          </div>
        </div>
        <div className="update-container">
          <div
            onClick={() => navigate("/driver_update/1")}
            className="update update-driver"
          >
            <p>Update Driver Information</p>
          </div>
          <div className="update update-bus">
            <p>Update Bus Information</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
