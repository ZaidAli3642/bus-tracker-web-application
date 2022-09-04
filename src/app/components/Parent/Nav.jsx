import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

import useParentAuth from "./../../context/auth/useParentAuth";
import { useContext } from "react";
import AuthContext from "./../../context/authContext";

const Nav = () => {
  const location = useLocation();
  const { parent } = useParentAuth();
  const { setParent } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      setParent(null);
      window.location = "/";
    } catch (error) {
      console.log(error);
    }
  };

  if (location.pathname === "/login" || location.pathname === "/register")
    return null;

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
              {parent && (
                <>
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
                </>
              )}
              {!parent && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      <span>Login</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      <span>Register</span>
                    </NavLink>
                  </li>
                </>
              )}

              {parent && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    onClick={logout}
                    to="/"
                    replace={true}>
                    <span>Logout</span>
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
