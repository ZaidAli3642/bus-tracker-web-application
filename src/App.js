import { useEffect, useState } from "react";
import Aos from "aos";

import AdminRoutes from "./app/containers/admin/AdminRoutes";
import "./main.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./app/containers/parents/Home";
import Nav from "./app/components/Parent/Nav";
import Login from "./app/containers/parents/Login";
import Register from "./app/containers/parents/Register";
import Messages from "./app/containers/parents/Messages";
import NotFound from "./app/containers/NotFound";
import ParentPrivateRoutes from "./app/routes/ParentPrivateRoute";
import AuthContext from "./app/context/authContext";
import LiveLocation from "./app/containers/parents/LiveLocation";
import Profile from "./app/containers/parents/Profile";

const routes = [
  "/",
  "/login",
  "/register",
  "/messages",
  "/location",
  "/profile",
  "/route-not-found",
];

function App() {
  const location = useLocation();
  const [parent, setParent] = useState(null);

  const initScrollReveal = () => {
    Aos.init({
      tartEvent: "DOMContentLoaded",
      easing: "linear",
      initClassName: "aos-init",
      animatedClassName: "aos-animate",
      duration: 400,
      mirror: false,
      once: false,
    });
  };

  useEffect(() => {
    initScrollReveal();
  }, []);
  return (
    <>
      {!routes.includes(location.pathname) ? (
        <AdminRoutes />
      ) : (
        <>
          <AuthContext.Provider value={{ parent, setParent }}>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/messages"
                element={
                  <ParentPrivateRoutes>
                    <Messages />
                  </ParentPrivateRoutes>
                }
              />
              <Route
                path="/location"
                element={
                  <ParentPrivateRoutes>
                    <LiveLocation />
                  </ParentPrivateRoutes>
                }
              />
              <Route
                path="/profile"
                element={
                  <ParentPrivateRoutes>
                    <Profile />
                  </ParentPrivateRoutes>
                }
              />
              <Route path="/login" element={<Login />} />
              {/* <Route path="/register" element={<Register />} /> */}
              <Route path="/route-not-found" element={<NotFound />} />
              <Route
                path="*"
                element={<Navigate to={"/route-not-found"} replace />}
              />
            </Routes>
          </AuthContext.Provider>
        </>
      )}
    </>
  );
}

export default App;
