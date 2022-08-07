const Detail = ({ label, detail }) => {
  return (
    <>
      <label className="label" htmlFor="">
        {label}
      </label>
      <p>{detail}</p>
    </>
  );
};

export default Detail;
