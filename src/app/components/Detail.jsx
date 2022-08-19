const Detail = ({ label, detail, margin }) => {
  return (
    <div style={{ margin: margin }}>
      <label className="label" htmlFor="">
        {label}
      </label>
      <p>{detail}</p>
    </div>
  );
};

export default Detail;
