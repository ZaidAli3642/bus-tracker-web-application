import { useState } from "react";
import Login from "./app/containers/Login";
import Register from "./app/containers/Register";
import Home from "./app/containers/Home";
import "./main.css";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import PrivateRoutes from "./app/routes/PrivateRoutes";
import NotFound from "./app/containers/NotFound";
import AuthContext from "./app/context/authContext";
import Messages from "./app/containers/Messages";

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  return (
    <div
      className={
        location.pathname === "/messages" ? "container-fluid" : "container"
      }
    >
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
}

export default App;
