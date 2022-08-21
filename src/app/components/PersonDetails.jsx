const PersonDetails = ({ image, name, designation, handleClick }) => {
  return (
    <>
      <div className="people-details" onClick={handleClick}>
        <img
          src={image}
          className="profile-image profile-rounded-image"
          alt=""
        />
        <div className="user-details">
          <h5 className="name">{name}</h5>
          <h6>{designation}</h6>
          <div className="line"></div>
        </div>
      </div>
    </>
  );
};

export default PersonDetails;
