import React from "react";
import { GoLocation, GoPerson } from "react-icons/go";
import { BiBusSchool } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import SideItem from "../components/SideItem";

const sidebar = [
  { id: 1, text: "Home", Icon: AiFillHome, to: "home" },
  { id: 2, text: "Location", Icon: GoLocation, to: "location" },
  { id: 4, text: "Students", Icon: BiBusSchool, to: "student" },
  { id: 3, text: "Drivers", Icon: GoPerson, to: "driver" },
  { id: 4, text: "Buses", Icon: BiBusSchool, to: "bus" },
];

const Sidebar = () => {
  return (
    <div className="col-2 sidebar">
      <div className="image-container">
        <img
          className="profile-image"
          src={require("../assets/zaid-saleem-image.jpg")}
          alt="Admin Image"
        />
      </div>

      <h4 className="admin-name">Zaid Saleem</h4>
      <p className="admin-designation">Admin</p>

      <div className="mt-5 side-items">
        <ul className="item-list">
          {sidebar.map((item) => (
            <SideItem
              id={item.id}
              Icon={item.Icon}
              to={item.to}
              text={item.text}
            />
          ))}
        </ul>

        <SideItem Icon={FiLogOut} text={"Logout"} />
      </div>
    </div>
  );
};

export default Sidebar;
