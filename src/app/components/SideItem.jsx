import React from "react";

const SideItem = ({ color = "#17191C", size = 20, text, Icon, id }) => {
  return (
    <div className="side-item" id={id}>
      <Icon color={color} size={size} />
      <p className="item-text">{text}</p>
    </div>
  );
};

export default SideItem;
