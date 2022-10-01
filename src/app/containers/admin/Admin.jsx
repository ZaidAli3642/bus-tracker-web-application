import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

import useAuth from "../../context/auth/useAuth";
import {
  getBusCount,
  getDriverCount,
  getStudentCount,
} from "../../firebase/firebaseCalls/get";
import { usePromise } from "../../hooks/usePromise";

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, loading, requestPromise } = usePromise();

  useEffect(() => {
    requestPromise(
      getStudentCount(user),
      getDriverCount(user),
      getBusCount(user)
    );
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <h1>Hello {user.firstname}</h1>
      <label htmlFor="" className="label">
        Welcome Back!
      </label>
      <div className="admin">
        <div className="update-container">
          {/* <div
            className="update update-admin"
          >
            <p>Update Your Information</p>
          </div> */}
          <div className="update update-student ms-0">
            <p>Studnets</p>
            <span>{data && data[0]}</span>
          </div>
          <div className="update update-driver">
            <p>Drivers</p>
            <span>{data && data[1]}</span>
          </div>
        </div>
        <div className="update-container">
          <div className="update update-bus mx-0">
            <p>Buses</p>
            <span>{data && data[2]}</span>
          </div>
          <div className="update update-bus me-0">
            <p>Routes</p>
            <span>{data && data[2]}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
