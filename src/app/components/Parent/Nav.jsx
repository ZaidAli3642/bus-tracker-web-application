import { useEffect, useState } from "react";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const [postion, setPosition] = useState("");

  const handleScrollPosition = () => {
    console.log(window.scrollY);
    if (window.scrollY > 100) return setPosition("sticky");
    setPosition("");
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPosition);
  });

  return (
    <header className="nav-container" data-aos="fade-down" data-aos-once="true">
      <div className="contact-header">
        <div className="contact-details">
          <div className="contact">
            <AiOutlineMail className="icon" />
            <span>zaidali36422@gmail.com</span>
          </div>
          <div className="contact">
            <AiOutlinePhone className="icon ml-4" />
            12345678
          </div>
        </div>
      </div>

      <nav className={"navbar navbar-expand-lg bg-white"}>
        <div className={`container-fluid d-flex h-50 p-2 bg-white`}>
          <NavLink className="navbar-brand ms-5" to={"/"}>
            Navbar
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse d-md-flex justify-content-end me-md-5"
            id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to={"/"}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/location">
                  Live Location
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/messages">
                  Messages
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  <span> Profile</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
