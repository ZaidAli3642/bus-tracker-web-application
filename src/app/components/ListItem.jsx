import { Link } from "react-router-dom";

const ListItem = ({ title, id, to, onClick }) => {
  return (
    <div className="item">
      <Link to={to + `/${id}`} className="item-container" id={id}>
        <p className="item-text">{title}</p>
      </Link>
      <button className="btn btn-secondary btn-md" onClick={onClick}>
        Update
      </button>
    </div>
  );
};

export default ListItem;
