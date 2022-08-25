import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import PrivateRoutes from "./../../routes/PrivateRoutes";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import NotFound from "./../NotFound";
import AuthContext from "./../../context/authContext";
import Messages from "./Messages";

const AdminRoutes = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  return (
    <div
      className={
        location.pathname === "/messages" ? "container-fluid" : "container"
      }>
      <AuthContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/admin/*" element={<Home />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/not-found" element={<Navigate to={"/not-found"} />} />
          </Route>
          <Route path="/admin/register" element={<Register />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/not-found" element={<NotFound />} />
          <Route
            path="/admin/not-found"
            element={<Navigate to={"/admin/not-found"} />}
          />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
};

export default AdminRoutes;
