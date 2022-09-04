import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import PrivateRoutes from "./../../routes/PrivateRoutes";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import NotFound from "./../NotFound";
import AuthContext from "./../../context/authContext";
import Messages from "./Messages";
import Location from "./Location";

const AdminRoutes = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  return (
    <div
      className={
        location.pathname === "/admin/messages" ||
        location.pathname === "/admin/location"
          ? "container-fluid"
          : "container"
      }>
      <AuthContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/admin/*" element={<Home />} />
            <Route path="/admin/messages" element={<Messages />} />
            <Route path="/admin/location" element={<Location />} />
          </Route>
          <Route path="/admin/register" element={<Register />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route
            path="/not-found"
            element={<Navigate to={"/not-found"} replace />}
          />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
};

export default AdminRoutes;
