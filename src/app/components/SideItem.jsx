import React from "react";
import { Link } from "react-router-dom";

const SideItem = ({
  color = "#ffffff",
  to,
  size = 20,
  text,
  Icon,
  target,
  handleClick,
}) => {
  return (
    <li className="side-item">
      <Icon color={color} size={size} />
      <Link
        onClick={handleClick}
        to={`/${to}`}
        className="item-text"
        target={target}
      >
        {text}
      </Link>
    </li>
  );
};

export default SideItem;
