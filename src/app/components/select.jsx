import { useFormikContext } from "formik";
import React from "react";
import ErrorMessage from "./ErrorMessage";

const Select = ({ name, label, options }) => {
  const { errors, handleChange, touched, setFieldTouched } = useFormikContext();

  return (
    <div className="input-container">
      <label className="label">{label}</label>
      <select
        name={name}
        onChange={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
      >
        <option value="Select State" />
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.state}
          </option>
        ))}
      </select>
      <ErrorMessage
        error={errors["maintainance"]}
        visible={touched["maintainance"]}
      />
    </div>
  );
};

export default Select;
