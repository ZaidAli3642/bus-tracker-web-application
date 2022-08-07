import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const ListItem = ({ title, size = 20, id, to }) => {
  return (
    <Link to={to + `/${id}`} className="item-container" id={id}>
      <p className="item-text">{title}</p>
      <BsFillArrowRightSquareFill size={size} />
    </Link>
  );
};

export default ListItem;
