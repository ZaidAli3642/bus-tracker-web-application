import React from "react";
import { Link } from "react-router-dom";

const SideItem = ({
  color = "#ffffff",
  to,
  size = 20,
  text,
  Icon,
  id,
  handleClick,
}) => {
  return (
    <li className="side-item">
      <Icon color={color} size={size} />
      <Link onClick={handleClick} to={`/${to}`} className="item-text">
        {text}
      </Link>
    </li>
  );
};

export default SideItem;
