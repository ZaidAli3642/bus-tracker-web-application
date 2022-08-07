import React from "react";
import { Link } from "react-router-dom";

const SideItem = ({ color = "#ffffff", to, size = 20, text, Icon, id }) => {
  return (
    <li className="side-item" id={id}>
      <Icon color={color} size={size} />
      <Link to={`/${to}`} className="item-text">
        {text}
      </Link>
    </li>
  );
};

export default SideItem;
