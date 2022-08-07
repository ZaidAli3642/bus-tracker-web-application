const Input = ({ label, value }) => {
  return (
    <div className="input-container">
      <label htmlFor="" className="label">
        {label}
      </label>
      <input type="text" value={value} />
    </div>
  );
};

export default Input;
