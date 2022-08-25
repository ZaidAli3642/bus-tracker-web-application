import { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import Aos from "aos";

import AdminRoutes from "./app/containers/admin/AdminRoutes";
import "./main.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./app/containers/parents/Home";
import Nav from "./app/components/Parent/Nav";

const routes = ["/"];

function App() {
  const location = useLocation();
  const initScrollReveal = () => {
    // ScrollReveal().reveal(".slider-container", {
    //   delay: 300,
    //   origin: "top",
    //   easing: "cubic-bezier(0.5, 0, 0, 1)",
    //   distance: "30px",
    //   duration: 1000,
    //   cleanup: true,
    //   reset: true,
    //   viewFactor: 0.5,
    //   afterReveal: (el) => {
    //     el.classList.remove("is-animating");
    //   },
    // });

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
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
