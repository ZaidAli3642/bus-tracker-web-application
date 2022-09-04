import { Link } from "react-router-dom";

const ListItem = ({ title, id, to, onClick, state, onDelete }) => {
  return (
    <div className="item">
      <Link
        to={to + `/${id}`}
        state={state || {}}
        className="item-container ps-4"
        id={id}>
        <li className="item-text">{title}</li>
      </Link>
      <button className="btn btn-secondary btn-md" onClick={onClick}>
        Update
      </button>
      <button className="btn btn-danger btn-md" onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );
};

export default ListItem;
