import React from "react";
import { GoLocation, GoPerson } from "react-icons/go";
import { BiBusSchool } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import SideItem from "./components/SideItem";

const sidebar = [
  { id: 1, text: "Location", Icon: GoLocation },
  { id: 2, text: "Drivers", Icon: GoPerson },
  { id: 3, text: "Buses", Icon: BiBusSchool },
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
        <div>
          {sidebar.map((item) => (
            <SideItem id={item.id} Icon={item.Icon} text={item.text} />
          ))}
        </div>

        <SideItem Icon={FiLogOut} text={"Logout"} />
      </div>
    </div>
  );
};

export default Sidebar;
