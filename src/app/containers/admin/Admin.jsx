import { useNavigate } from "react-router-dom";

import useAuth from "../../context/auth/useAuth";

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
            onClick={() => navigate("/admin/admin_update/" + user.id)}
            className="update update-admin"
          >
            <p>Update Your Information</p>
          </div>
          <div
            onClick={() => navigate("/admin/student_update/new")}
            className="update update-student"
          >
            <p>Add Student Information</p>
          </div>
        </div>
        <div className="update-container">
          <div
            onClick={() => navigate("/admin/driver_update/new")}
            className="update update-driver"
          >
            <p>Add Driver Information</p>
          </div>
          <div
            className="update update-bus"
            onClick={() => navigate("/admin/bus_update/new")}
          >
            <p>Add Bus and Route Information</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
