import { useFormikContext } from "formik";
import React from "react";
import ErrorMessage from "./ErrorMessage";

const Select = ({ name, label, options }) => {
  const { errors, handleChange, touched, setFieldTouched, values } =
    useFormikContext();

  return (
    <div className="input-container">
      <label className="label">{label}</label>
      <select
        name={name}
        onChange={handleChange(name)}
        value={values[name]}
        onBlur={() => setFieldTouched(name)}
      >
        <option value="Select State" />
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </div>
  );
};

export default Select;
