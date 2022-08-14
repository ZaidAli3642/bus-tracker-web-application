import { useNavigate } from "react-router-dom";

import useAuth from "./../context/auth/useAuth";

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <>
      <h1>Hello {user.firstname}</h1>
      <label htmlFor="" className="label">
        Welcome Back!
      </label>
      <div className="admin">
        <div className="update-container">
          <div
            onClick={() => navigate("/admin/admin_update/" + user.admin_id)}
            className="update update-admin"
          >
            <p>Update Your Information</p>
          </div>
          <div
            onClick={() => navigate("/admin/student_update/1")}
            className="update update-student"
          >
            <p>Update Student Information</p>
          </div>
        </div>
        <div className="update-container">
          <div
            onClick={() => navigate("/admin/driver_update/1")}
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
