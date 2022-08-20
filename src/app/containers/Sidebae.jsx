import React, { useContext } from "react";
import { GoLocation, GoPerson } from "react-icons/go";
import { BiBusSchool } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

import SideItem from "../components/SideItem";
import AuthContext from "../context/authContext";
import useAuth from "../context/auth/useAuth";

const sidebar = [
  { id: 1, text: "Home", Icon: AiFillHome, to: "admin/home" },
  { id: 2, text: "Location", Icon: GoLocation, to: "admin/location" },
  { id: 3, text: "Students", Icon: BiBusSchool, to: "admin/student" },
  { id: 4, text: "Drivers", Icon: GoPerson, to: "admin/driver" },
  { id: 5, text: "Buses", Icon: BiBusSchool, to: "admin/bus" },
  {
    id: 6,
    text: "Messages",
    Icon: FiMessageSquare,
    to: "messages",
    target: "_blank",
  },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const { user } = useAuth();
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/admin/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-2 sidebar">
      <div className="image-container">
        <img
          className="profile-image"
          src={
            user.image ? user.image : require("../assets/profile-avatar.jpg")
          }
          alt="Admin"
        />
      </div>

      <h4 className="admin-name">{`${user.firstname} ${user.lastname}`}</h4>
      <p className="admin-designation">{user.designation}</p>

      <div className="mt-5 side-items">
        <ul className="item-list">
          {sidebar.map((item) => (
            <SideItem
              key={item.id}
              Icon={item.Icon}
              to={item.to}
              text={item.text}
              target={item.target}
            />
          ))}
        </ul>

        <SideItem Icon={FiLogOut} handleClick={logout} text={"Logout"} />
      </div>
    </div>
  );
};

export default Sidebar;
